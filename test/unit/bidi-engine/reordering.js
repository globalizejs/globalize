define([
	"src/core",
	"src/bidi-engine"
], function( Globalize ) {

QUnit.module( "Bidi engine" );
var options = {isInputVisual: true, isSymmetricSwapping: true, isInputRtl: false, isOutputRtl: false},
		bidiEngine = Globalize.bidiEngine( options ), sourceString = "a(b)c\u05d0<\u05d5>\u05ea& 123";

QUnit.test( "Visual left-to-right ->Logical left-to-right conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  var reorderedString = bidiEngine.doBidiReorder( sourceString, sourceToTargetMap, levels );
  assert.equal( reorderedString, "a(b)c123 &\u05ea<\u05d5>\u05d0" );
  assert.deepEqual( sourceToTargetMap, [ 0, 1, 2, 3, 4, 12, 13, 14, 11, 10, 9, 8, 7, 6, 5 ] );
  assert.deepEqual( levels, [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2] );
});

QUnit.test( "Logical right-to-left -> Visual left-to-right conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options = {};
  options.isOutputVisual = true;
  options.isInputRtl = true;
  options.isOutputRtl = false;
  options.isSymmetricSwapping = true;
  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( sourceString, sourceToTargetMap, levels );
  assert.equal( reorderedString, "123 &\u05ea<\u05d5>\u05d0a(b)c" );
  assert.deepEqual( sourceToTargetMap, [ 12, 13, 14, 11, 10, 9, 8, 7, 6, 5, 0, 1, 2, 3, 4 ] );
  assert.deepEqual( levels, [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ] );
});

QUnit.test( "Logical left-to-right -> Logical right-to-left conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options.isInputVisual = options.isOutputVisual = false;
  options.isInputRtl = false;
  options.isOutputRtl = true;
  options.isSymmetricSwapping = false;

  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( sourceString, sourceToTargetMap, levels );
  assert.equal( reorderedString, "\u05d0<\u05d5>\u05ea& a(b)c123" );
  assert.deepEqual( sourceToTargetMap, [ 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 12, 13, 14 ] );
  assert.deepEqual( levels, [ 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2 ] );
});

QUnit.test( "Logical right-to-left -> Logical  left-to-right conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options.isInputVisual = options.isOutputVisual = false;
  options.isInputRtl = true;
  options.isOutputRtl = false;
  options.isSymmetricSwapping = false;

  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( sourceString, sourceToTargetMap, levels );
  assert.equal( reorderedString, "123 &\u05d0<\u05d5>\u05eaa(b)c" );
  assert.deepEqual( sourceToTargetMap, [ 12, 13, 14, 11, 10, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4 ] );
  assert.deepEqual( levels, [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ] );
});

QUnit.test( "Visual right-to-left -> Visual left-to-right conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options.isInputVisual = options.isOutputVisual = true;
  options.isInputRtl = true;
  options.isOutputRtl = false;
  options.isSymmetricSwapping = false;

  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( sourceString, sourceToTargetMap, levels );
  assert.equal( reorderedString, "321 &\u05ea>\u05d5<\u05d0c)b(a" );
  assert.deepEqual( sourceToTargetMap, [ 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ] );
  assert.deepEqual( levels, [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ] );
});

QUnit.test( "Logical contextual -> Visual right-to-left conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options = {};
  options.isInputVisual = false;
  options.isOutputVisual = true;
  options.isOutputRtl = true;
  options.isSymmetricSwapping = true;

  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( "\u05ea<\u05d5>\u05d0a)b(c", sourceToTargetMap, levels );
  assert.equal( reorderedString, "\u05ea>\u05d5<\u05d0c(b)a" );
  assert.deepEqual( sourceToTargetMap, [ 0, 1, 2, 3, 4, 9, 8, 7, 6, 5] );
  assert.deepEqual( levels, [ 1, 1, 1, 1, 1, 2, 2, 2, 2, 2 ] );
});

QUnit.test( "Logical left-to-right -> Visual right-to-left conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options.isInputVisual = false;
  options.isOutputVisual = true;
  options.isInputRtl = false;
  options.isOutputRtl = true;
  options.isSymmetricSwapping = true;

  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( sourceString , sourceToTargetMap, levels );
  assert.equal( reorderedString, "\u05d0>\u05d5<\u05ea& 321c)b(a" );
  assert.deepEqual( sourceToTargetMap, [ 5, 6, 7, 8, 9, 10, 11, 14, 13, 12, 4, 3, 2, 1, 0 ] );
  assert.deepEqual( levels, [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ] );
});

QUnit.test( "Visual right-to-left  -> Logical right-to-left conversion", function( assert ) {
  var levels = [], sourceToTargetMap = [];

  options.isInputVisual = true;
  options.isOutputVisual = false;
  options.isOutputRtl = options.isInputRtl = true;
  options.isSymmetricSwapping = true;

  bidiEngine.setOptions( options );

  var reorderedString = bidiEngine.doBidiReorder( sourceString , sourceToTargetMap, levels );
  assert.equal( reorderedString, "c)b(a\u05d0>\u05d5<\u05ea& 321" );
  assert.deepEqual( sourceToTargetMap, [ 4, 3, 2, 1, 0, 5, 6, 7, 8, 9, 10, 11, 14, 13, 12 ] );
  assert.deepEqual( levels, [ 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2 ] );
});

});
