! function() {
    var a = window.FilePicker = function(a) {
        this.apiKey = a.apiKey, this.clientId = a.clientId, this.buttonEl = a.buttonEl, this.onSelect = a.onSelect;
        var b = this;
        gapi.client.setApiKey(this.apiKey), gapi.client.load("drive", "v2", function() {
            b._driveApiLoaded.bind(b), google.load("picker", "1", {
                callback: b.open.bind(b)
            })
        })
    };
    a.prototype = {
        open: function() {
            var a = gapi.auth.getToken();
            a ? this._showPicker() : this._doAuth(!1, function() {
                this._showPicker()
            }.bind(this))
        },
        _showPicker: function() {
            var a = gapi.auth.getToken().access_token;
            this.picker = (new google.picker.PickerBuilder).addView(google.picker.ViewId.DOCS_IMAGES).setAppId(this.clientId).setOAuthToken(a).setCallback(this._pickerCallback.bind(this)).build().setVisible(!0)
        },
        _pickerCallback: function(a) {
            if (a[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                var b = a[google.picker.Response.DOCUMENTS][0],
                    c = b[google.picker.Document.ID],
                    d = gapi.client.drive.files.get({
                        fileId: c
                    });
                d.execute(this._fileGetCallback.bind(this))
            }
        },
        _fileGetCallback: function(a) {
            this.onSelect && this.onSelect(a)
        },
        _pickerApiLoaded: function() {
            this.buttonEl.disabled = !1
        },
        _driveApiLoaded: function() {
            this._doAuth(!0)
        },
        _doAuth: function(a, b) {
            gapi.auth.authorize({
                client_id: this.clientId + "-dt5kvh0nf5kvgos76jnnnctd1s0pi9un.apps.googleusercontent.com",
                scope: "https://www.googleapis.com/auth/drive.readonly",
                immediate: a
            }, b)
        }
    }
}();