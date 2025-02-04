const Metalsmith = require('metalsmith');
const equal = require('assert-dir-equal');
const rimraf = require('rimraf');
const path = require('path');
const plugin = require('..');
const { it, describe } = require('mocha');
const { doesNotThrow, strictEqual } = require('assert');

describe('@metalsmith/layouts', () => {
  it('should apply a single layout to a single file', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'single-file');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should apply a single layout to a single file with an async jstransformer', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'single-file-async');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should apply a single layout to multiple files', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'multiple-files');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should apply multiple layouts to multiple files', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'multiple-files-and-layouts');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should apply a default layout', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'default-layout');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ default: 'standard.hbs' })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should override a default layout', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'override-default-layout');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ default: 'standard.hbs' })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should apply a string pattern', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'string-pattern');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ pattern: 'match.html' })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should apply an array of string patterns', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'array-pattern');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ pattern: ['match.html', 'also.html'] })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should ignore binary files', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'ignore-binary');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ default: 'standard.hbs' })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should accept an alternate directory for layouts', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'directory');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ directory: 'templates' })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should process variables from the frontmatter', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'variables');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should process variables from the metadata', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'metadata');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith
      .metadata({ text: 'Some text' })
      .use(plugin())
      .build((err) => {
        if (err) {
          return done(err);
        }
        doesNotThrow(() => equal(actual, expected));
        return done();
      });
  });

  it('should override variables from the metadata with local ones', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'override-metadata');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith
      .metadata({ text: 'Some text' })
      .use(plugin())
      .build((err) => {
        if (err) {
          return done(err);
        }
        doesNotThrow(() => equal(actual, expected));
        return done();
      });
  });

  it('should return an error when there are no valid files to process', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'no-files');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin()).build((err) => {
      strictEqual(err instanceof Error, true);
      strictEqual(
        err.message,
        'no files to process. See https://www.npmjs.com/package/@metalsmith/layouts#suppressnofileserror'
      );
      done();
    });
  });

  it('should not return an error when there are no valid files to process and suppressNoFilesError is true', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'no-files');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin({ suppressNoFilesError: true })).build((err) => {
      strictEqual(err, null);
      done();
    });
  });

  it('should return an error for an invalid pattern', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'invalid-pattern');
    const metalsmith = new Metalsmith(base);

    return metalsmith
      .use(
        plugin({
          pattern: () => {}
        })
      )
      .build((err) => {
        strictEqual(err instanceof Error, true);
        strictEqual(
          err.message,
          'invalid pattern, the pattern option should be a string or array of strings. See https://www.npmjs.com/package/@metalsmith/layouts#pattern'
        );
        done();
      });
  });

  it('should ignore layouts without an extension', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'ignore-invalid-layout');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should ignore layouts without a jstransformer', (done) => {
    const base = path.join(
      process.cwd(),
      'test',
      'fixtures',
      'ignore-layout-without-jstransformer'
    );
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin()).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should allow default layouts to be disabled from the frontmatter', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'override-default');
    const actual = path.join(base, 'build');
    const expected = path.join(base, 'expected');
    const metalsmith = new Metalsmith(base);

    rimraf.sync(actual);

    return metalsmith.use(plugin({ default: 'standard.hbs' })).build((err) => {
      if (err) {
        return done(err);
      }
      doesNotThrow(() => equal(actual, expected));
      return done();
    });
  });

  it('should prefix rendering errors with the filename', (done) => {
    const base = path.join(process.cwd(), 'test', 'fixtures', 'rendering-error');
    const metalsmith = new Metalsmith(base);

    return metalsmith.use(plugin()).build((err) => {
      strictEqual(err instanceof Error, true);
      strictEqual(err.message.slice(0, 'index.html'.length + 1), 'index.html:');
      done();
    });
  });
});
