# Basic Globalize Compiler example

This example focuses on the Globalize Compiler and the Globalize runtime
modules. It assumes knowledge of Globalize usage basics.

## Requirements

**1. Install Globalize dependencies and Globalize Compiler**

This example uses `npm` to download Globalize dependencies (i.e., CLDR data and
the Cldrjs library) and the [Globalize Compiler][].

```
npm install
```

[Globalize Compiler]: https://github.com/globalizejs/globalize-compiler

## Running the example

### Development mode

1. Start a server by running `python -m SimpleHTTPServer` or other alternative
servers such as [http-server][], [nginx][], [apache][].
1. Point your browser at `http://localhost:8000/development.html`. Note that the
formatters are created dynamically. Therefore, Cldrjs and CLDR data are
required.
1. Understand the demo by reading the source code. We have comments there for
you.

[http-server]: https://github.com/nodeapps/http-server
[nginx]: http://nginx.org/en/docs/
[apache]: http://httpd.apache.org/docs/trunk/

### Production mode

1. Compile the application formatters by running `npm run build`. See
`package.json` to understand the actual shell command that is used. For more
information about the compiler, see the [Globalize Compiler documentation][].
1. Point your browser at `./production.html`. Note that we don't need Cldrjs nor
CLDR data in production here.
1. Understand the demo by reading the source code. We have comments there for
you.

[Globalize Compiler documentation]: https://github.com/globalizejs/globalize-compiler#README
