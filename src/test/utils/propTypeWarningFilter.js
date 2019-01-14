export function filterErrors() {
    const consoleErrorCopy = console.error;
    sinon.stub(console, 'error').callsFake((...args) => (args[0].includes('Warning: Failed prop type') ? null : consoleErrorCopy(args)));
}

export function restoreErrors() {
    console.error.restore();
}
