import JasmineSpecReporter from 'jasmine-spec-reporter';

const { SpecReporter } = JasmineSpecReporter;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
    new SpecReporter({
        spec: {
            displayPending: true,
        },
        summary: {
            displayDuration: false,
        },
    })
);
