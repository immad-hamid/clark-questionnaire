export class SnackBarServiceMock {
    openSnackBar(message: string, action: string = 'Close') {
        if (message) {
            return { message, action };
        } else {
            throw new Error('Error Occured...');
        }
    }
}
