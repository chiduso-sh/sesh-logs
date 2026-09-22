// Imported by every test file. Importing a file runs it, so this check
// happens before any test can open a connection.
//
// It refuses to continue unless APP_ENV says "test" - which only .env.test sets.
// Without it, `node --env-file=.env --test` would write users to production.

if(process.env.APP_ENV !== 'test'){
    throw new Error("APP_ENV must be 'test' — use .env.test locally or the CI secret"); 
}