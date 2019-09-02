export abstract class Dialog {

    alertMessage: String;
    alertSuccess: Boolean;
    title: String;
    btnText: String;
    alertSuccesText: String;
    alertErrorText: String;
    modalMode: String;

    showAlert(message, isSuccess) {
        this.alertMessage = message;
        this.alertSuccess = isSuccess;
    }

    abstract closeModal(): void;
    abstract loadModalTexts(): void;

}