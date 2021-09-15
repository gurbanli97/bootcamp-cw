const EAMONITORING = {
    onError: function(event) {
        const error = {};
        if (event instanceof ErrorEvent) {
            error.error = {
                colno: event.colno,
                filename: event.filename,
                lineno: event.lineno,
                message: event.message,
            } 
        } else {
            error.error = {
                tagName: event.target.tagName,
                currentSrc: event.target.currentSrc
            }
        }
    
        error.navigator = {
            cookieEnabled: window.navigator.cookieEnabled,
            deviceMemory: window.navigator.deviceMemory,
            hardwareConcurrency: window.navigator.hardwareConcurrency,
            language: window.navigator.language,
            languages: window.navigator.languages,
            onLine: window.navigator.onLine,
            userAgent: window.navigator.userAgent,
            vendor: window.navigator.vendor,
            platform: window.navigator.platform,
            plugins: window.navigator.plugins,
            oscpu: window.navigator.oscpu,
            appName: window.navigator.appName,
            appVersion: window.navigator.appVersion,
            appCodeName: window.navigator.appCodeName
        }
    
        EAMONITORING.post('http://localhost:3000/collect', error);
    },
    onPerformance: function(event){
        const logs = window.performance && window.performance.toJSON();
        console.log("Performance: ", logs);
        // EAMONITORING.post('/collect', logs);
    },
    post: function (url, logs) {
        const http = new XMLHttpRequest();
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                console.log('sent');
            }
        }
        http.send(JSON.stringify(logs));

        console.log("Errors:", logs);
    }
}


window.addEventListener('error', EAMONITORING.onError, {capture: true});
window.addEventListener('load', EAMONITORING.onPerformance, {capture: true});