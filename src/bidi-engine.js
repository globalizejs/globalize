define([
	"./core",
	"./bidi/unicode-types"
], function( Globalize, bidiUnicodeTypes ) {

/**
 * constructor ( options )
 *
 * Initializes Bidi engine
 *
 * @options [Object]: See 'setOptions' below for detailed description.
 * options are cashed between invocation of 'doBidiReorder' method
 *
 * sample usage pattern of BidiEngine:
 * var opt = {
 * 	isInputVisual: true,
 * 	isInputRtl: false,
 * 	isOutputVisual: false,
 * 	isOutputRtl: false,
 * 	isSymmetricSwapping: true
 * }
 * var sourceToTarget = [], levels = [];
 * var bidiEng = Globalize.bidiEngine(opt);
 * var src = "text string to be reordered";
 * var ret = bidiEng.doBidiReorder(src, sourceToTarget, levels);
 */

Globalize.bidiEngine =
Globalize.prototype.bidiEngine = function( options ) {

	var _UNICODE_TYPES = this._bidiUnicodeTypes;

	var _STATE_TABLE_LTR = [
		[ 0, 3, 0, 1, 0, 0, 0 ],
		[ 0, 3, 0, 1, 2, 2, 0 ],
		[ 0, 3, 0, 0x11, 2, 0, 1 ],
		[ 0, 3, 5, 5, 4, 1, 0 ],
		[ 0, 3, 0x15, 0x15, 4, 0, 1 ],
		[ 0, 3, 5, 5, 4, 2, 0 ] ];

	var _STATE_TABLE_RTL = [
		[ 2, 0, 1, 1, 0, 1, 0 ],
		[ 2, 0, 1, 1, 0, 2, 0 ],
		[ 2, 0, 2, 1, 3, 2, 0 ],
		[ 2, 0, 2, 0x21, 3, 1, 1 ] ];

	var _TYPE_NAMES_MAP = { "L": 0, "R": 1, "EN": 2, "AN": 3, "N": 4, "B": 5, "S": 6 };

	var _UNICODE_RANGES_MAP = { 0: 0, 5: 1, 6: 2, 7: 3, 0x20: 4, 0xFB: 5, 0xFE: 6, 0xFF: 7 };

	var _SWAP_TABLE = [
		"\u0028", "\u0029", "\u0028",
		"\u003C", "\u003E", "\u003C",
		"\u005B", "\u005D", "\u005B",
		"\u007B", "\u007D", "\u007B",
		"\u00AB", "\u00BB", "\u00AB",
		"\u2039", "\u203A", "\u2039",
		"\u2045", "\u2046", "\u2045",
		"\u207D", "\u207E", "\u207D",
		"\u208D", "\u208E", "\u208D",
		"\u2264", "\u2265", "\u2264",
		"\u2329", "\u232A", "\u2329",
		"\uFE59", "\uFE5A", "\uFE59",
		"\uFE5B", "\uFE5C", "\uFE5B",
		"\uFE5D", "\uFE5E", "\uFE5D",
		"\uFE64", "\uFE65", "\uFE64" ];

	var _LTR_RANGES_REG_EXPR = new RegExp( /^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/ );

	var _lastArabic = false, _hasUbatAl, _hasUbatB, _hasUbatS, DIR_LTR = 0, DIR_RTL = 1,
		_isInVisual, _isInRtl, _isOutVisual, _isOutRtl, _isSymmetricSwapping, _dir = DIR_LTR;

	this.$bidiEngine = {};

	var _init = function( text, sourceToTargetMap ) {
		if ( sourceToTargetMap ) {
			for ( var i = 0; i < text.length; i++ ) {
				sourceToTargetMap[i] = i;
			}
		}
		if ( _isInRtl === undefined ) {
			_isInRtl = _isContextualDirRtl( text );
		}
		if ( _isOutRtl === undefined ) {
			_isOutRtl = _isContextualDirRtl( text );
		}
	};

	var _getCharType = function( ch ) {
		var charCode = ch.charCodeAt(), range = charCode >> 8,
			rangeIdx = _UNICODE_RANGES_MAP[ range ];

		if ( rangeIdx !== undefined ) {
			return _UNICODE_TYPES[ ( rangeIdx * 256 ) + ( charCode & 0xFF ) ];
		} else if ( range === 0xFC || range === 0xFD ) {
			return "AL";
		} else if ( _LTR_RANGES_REG_EXPR.test( range ) ) { //unlikely case
			return "L";
		}  else if ( range === 8 ) { // even less likely
			return "R";
		}
		return "N"; //undefined type, mark as neutral
	};

	var _isContextualDirRtl = function( text ) {
		for ( var i = 0, charType; i < text.length; i++ ) {
			charType = _getCharType( text.charAt( i ) );
			if ( charType === "L" ) {
				return false;
			} else if ( charType === "R" ) {
				return true;
			}
		}
		return false;
	};

	var _resolveCharType = function( chars, types, resolvedTypes, idx ) {
		var cType = types[idx], wType, nType, len, i;
		switch ( cType ) {
			case "L":
			case "R":
				_lastArabic = false;
				break;
			case "N":
			case "AN":
				break;

			case "EN":
				if ( _lastArabic ) {
					cType = "AN";
				}
				break;

			case "AL":
				_lastArabic = true;
				_hasUbatAl = true;
				cType = "R";
				break;

			case "WS":
				cType = "N";
				break;

			case "CS":
				if ( idx < 1 || ( idx + 1 ) >= types.length ||
					( ( wType = resolvedTypes[idx - 1] ) !== "EN" && wType !== "AN" ) ||
					( ( nType = types[idx + 1] ) !== "EN" && nType !== "AN" ) ) {
					cType = "N";
				} else if ( _lastArabic ) {
					nType = "AN";
				}
				cType = ( nType === wType ) ? nType : "N";
				break;

			case "ES":
				wType = idx > 0 ? resolvedTypes[idx - 1] : "B";
				cType = wType === "EN" && ( idx + 1 ) < types.length && types[idx + 1] === "EN" ?
						"EN" : "N";
				break;

			case "ET":
				if ( idx > 0 && resolvedTypes[idx - 1] === "EN" ) {
					cType = "EN";
					break;
				} else if ( _lastArabic ) {
					cType = "N";
					break;
				}
				i = idx + 1;
				len = types.length;
				while ( i < len && types[i] === "ET" ) {
					i++;
				}
				if ( i < len && types[i] === "EN" ) {
					cType = "EN";
				} else {
					cType = "N";
				}
				break;

			case "NSM":
				if ( _isInVisual && !_isInRtl ) { //V->L
					len = types.length;
					i = idx + 1;
					while ( i < len && types[i] === "NSM" ) {
						i++;
					}
					if ( i < len ) {
						var c = chars[idx];
						var rtlCandidate = ( c >= 0x0591 && c <= 0x08FF ) || c === 0xFB1E;
						wType = types[i];
						if ( rtlCandidate && ( wType === "R" || wType === "AL" ) ) {
							cType = "R";
							break;
						}
					}
				}
				if ( idx < 1 || ( wType = types[idx - 1] ) === "B" ) {
					cType = "N";
				} else {
					cType = resolvedTypes[idx - 1];
				}
				break;

			case "B":
				_lastArabic = false;
				_hasUbatB = true;
				cType = _dir;
				break;

			case "S":
				_hasUbatS = true;
				cType = "N";
				break;

			case "LRE":
			case "RLE":
			case "LRO":
			case "RLO":
			case "PDF":
				_lastArabic = false;
				break;
			case "BN":
				cType = "N";
				break;
		}
		return cType;
	};

	var _handleUbatS = function( types, levels, length ) {
		for ( var i = 0; i < length; i++ ) {
			if ( types[i] === "S" ) {
				levels[i] = _dir;
				for ( var j = i - 1; j >= 0; j-- ) {
					if ( types[j] === "WS" ) {
						levels[j] = _dir;
					} else {
						break;
					}
				}
			}
		}
	};

	var _invertString = function( text, sourceToTargetMap, levels ) {
		var charArray = text.split( "" );
		if ( levels ) {
			_computeLevels( charArray, levels, { hiLevel: _dir } );
		}
		charArray.reverse();
		sourceToTargetMap && sourceToTargetMap.reverse();
		return charArray.join( "" );
	};

	var _computeLevels = function( chars, levels, params ) {
		var len = chars.length, prevState, newState = 0, newLevel, action, condition,
			stateTable = _dir ? _STATE_TABLE_RTL : _STATE_TABLE_LTR,
			condPos = -1, i, idx, types = [], resolvedTypes = [];

		_lastArabic = false;
		_hasUbatAl = false;
		_hasUbatB = false;
		_hasUbatS = false;
		for ( i = 0; i < len; i++ ) {
			types[i] = _getCharType( chars[i] );
		}
		for ( idx = 0; idx < len; idx++ ) {
			prevState = newState;
			resolvedTypes[idx] = _resolveCharType( chars, types, resolvedTypes, idx );
			newState = stateTable[prevState][_TYPE_NAMES_MAP[resolvedTypes[idx]]];
			action = newState & 0xF0;
			newState &= 0x0F;
			levels[idx] = newLevel = stateTable[newState][5];
			if ( action > 0 ) {
				if ( action === 0x10 ) {
					for ( i = condPos; i < idx; i++ ) {
						levels[i] = 1;
					}
					condPos = -1;
				} else {
					condPos = -1;
				}
			}
			condition = stateTable[newState][6];
			if ( condition ) {
				if ( condPos === -1 ) {
					condPos = idx;
				}
			} else {
				if ( condPos > -1 ) {
					for ( i = condPos; i < idx; i++ ) {
						levels[i] = newLevel;
					}
					condPos = -1;
				}
			}
			if ( types[idx] === "B" ) {
				levels[idx] = 0;
			}
			params.hiLevel |= newLevel;
		}
		if ( _hasUbatS ) {
			_handleUbatS( types, levels, len );
		}
	};

	var _invertByLevel = function( level, charArray, sourceToTargetMap, levels, params ) {
		if ( params.hiLevel < level ) {
			return;
		}
		if ( level === 1 && _dir === DIR_RTL && !_hasUbatB ) {
			charArray.reverse();
			sourceToTargetMap && sourceToTargetMap.reverse();
			return;
		}
		var len = charArray.length, start = 0, end, low, high, ch;
		while ( start < len ) {
			if ( levels[start] >= level ) {
				end = start + 1;
				while ( end < len && levels[end] >= level ) {
					end++;
				}
				for ( low = start, high = end - 1 ; low < high; low++, high-- ) {
					ch = charArray[low];
					charArray[low] = charArray[high];
					charArray[high] = ch;
					if ( sourceToTargetMap ) {
						ch = sourceToTargetMap[low];
						sourceToTargetMap[low] = sourceToTargetMap[high];
						sourceToTargetMap[high] = ch;
					}
				}
				start = end;
			}
			start++;
		}
	};

	var _symmetricSwap = function( charArray, levels, params ) {
		if ( params.hiLevel !== 0 && _isSymmetricSwapping ) {
			for ( var i = 0, idx; i < charArray.length; i++ ) {
				if ( levels[i] === 1 ) {
					idx = _SWAP_TABLE.indexOf( charArray[i] );
					if ( idx >= 0 ) {
						charArray[i] = _SWAP_TABLE[idx + 1];
					}
				}
			}
		}
	};

	var _reorder = function( text, sourceToTargetMap, levels ) {
		var charArray = text.split( "" ), params = { hiLevel: _dir };
		if ( !levels ) {
			levels = [];
		}
		_computeLevels( charArray, levels, params );
		_symmetricSwap( charArray, levels, params );
		_invertByLevel( DIR_RTL + 1, charArray, sourceToTargetMap, levels, params );
		_invertByLevel( DIR_RTL, charArray, sourceToTargetMap, levels, params );
		return charArray.join( "" );
	};

/**
 * doBidiReorder( text, sourceToTargetMap, levels )
 *
 * Performs Bidi reordering by implementing Unicode Bidi algorithm.
 * Returns reordered string
 * @text [String]:
 * - input string to be reordered, this is input parameter
 * $sourceToTargetMap [Array] (optional)
 * - resultant mapping between input and output strings, this is output parameter
 * $levels [Array] (optional)
 * - array of calculated Bidi levels, , this is output parameter
 *
 */
	this.$bidiEngine.doBidiReorder = function( text, sourceToTargetMap, levels ) {
		_init( text, sourceToTargetMap );
		if ( !_isInVisual && _isOutVisual && !_isOutRtl ) {
			/* LLTR->VLTR, LRTL->VLTR */
			_dir = _isInRtl ? DIR_RTL : DIR_LTR;
			text = _reorder( text, sourceToTargetMap, levels );
		} else if ( _isInVisual && _isOutVisual && ( _isInRtl ^ _isOutRtl ) ) {
			/* VRTL->VLTR, VLTR->VRTL */
			_dir = _isInRtl ? DIR_RTL : DIR_LTR;
			text = _invertString( text, sourceToTargetMap, levels );
		} else if ( !_isInVisual && _isOutVisual && _isOutRtl ) {
			/* LLTR->VRTL, LRTL->VRTL */
			_dir = _isInRtl ? DIR_RTL : DIR_LTR;
			text = _reorder( text, sourceToTargetMap, levels );
			text = _invertString( text, sourceToTargetMap );
		} else if ( _isInVisual && !_isInRtl && !_isOutVisual && !_isOutRtl ) {
			/* VLTR->LLTR */
			_dir = DIR_LTR;
			text = _reorder( text, sourceToTargetMap, levels );
		} else if ( _isInVisual && !_isOutVisual && ( _isInRtl ^ _isOutRtl ) ) {
			/* VLTR->LRTL, VRTL->LLTR */
			text = _invertString( text, sourceToTargetMap );
			if ( _isInRtl ) { //LLTR -> VLTR
				_dir = DIR_LTR;
				text = _reorder( text, sourceToTargetMap, levels );
			} else { //LRTL -> VRTL
				_dir = DIR_RTL;
				text = _reorder( text, sourceToTargetMap, levels );
				text = _invertString( text, sourceToTargetMap );
			}
		} else if ( _isInVisual && _isInRtl && !_isOutVisual && _isOutRtl ) {
			/*  VRTL->LRTL */
			_dir = DIR_RTL;
			text = _reorder( text, sourceToTargetMap, levels );
			text = _invertString( text, sourceToTargetMap );
		} else if ( !_isInVisual && !_isOutVisual && ( _isInRtl ^ _isOutRtl ) ) {
			/* LRTL->LLTR, LLTR->LRTL */
			var isSymmetricSwappingOrig = _isSymmetricSwapping;
			if ( _isInRtl ) { //LRTL->LLTR
				_dir = DIR_RTL;
				text = _reorder( text, sourceToTargetMap, levels );
				_dir = DIR_LTR;
				_isSymmetricSwapping = false;
				text = _reorder( text, sourceToTargetMap, levels );
				_isSymmetricSwapping = isSymmetricSwappingOrig;
			} else { //LLTR->LRTL
				_dir = DIR_LTR;
				text = _reorder( text, sourceToTargetMap, levels );
				text = _invertString( text, sourceToTargetMap );
				_dir = DIR_RTL;
				_isSymmetricSwapping = false;
				text = _reorder( text, sourceToTargetMap, levels );
				_isSymmetricSwapping = isSymmetricSwappingOrig;
				text = _invertString( text, sourceToTargetMap );
			}
		}
		return text;
	};

/**
 * setOptions( options )
 *
 * Sets options for Bidi conversion
 *
 * @options [Object]:
 * - isInputVisual [boolean] (defaults to false):
 * allowed values: true(Visual mode), false(Logical mode)
 * - isInputRtl [boolean]:
 * allowed values true(Right-to-left direction), false (Left-to-right directiion),
 * undefined(Contectual direction, i.e.direction defined by first strong character of input string)
 * - isOutputVisual [boolean] (defaults to false):
 * allowed values: true(Visual mode), false(Logical mode)
 * - isOutputRtl [boolean]:
 * allowed values true(Right-to-left direction), false (Left-to-right directiion),
 * undefined(Contectual direction, i.e.direction defined by first strong character of input string)
 * - isSymmetricSwapping [boolean] (defaults to false):
 * allowed values true(needs symmetric swapping), false (no need in symmetric swapping),
 */
	this.$bidiEngine.setOptions = function( options ) {
		if ( options ) {
			_isInVisual = options.isInputVisual;
			_isOutVisual = options.isOutputVisual;
			_isInRtl = options.isInputRtl;
			_isOutRtl = options.isOutputRtl;
			_isSymmetricSwapping = options.isSymmetricSwapping;
		}
	};

	this.$bidiEngine.setOptions( options );
	return this.$bidiEngine;
};

Globalize._bidiUnicodeTypes = bidiUnicodeTypes;

return Globalize;

});
