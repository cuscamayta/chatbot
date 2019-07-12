exports.error = (error) => {
    console.log("Error : %s", error);
}

exports.info = (info) => {
    console.log("Info : %s", info);
}

exports.warning = (message) => {
    console.log("Warning : %s", message);
}

exports.fatal = (error) => {
    console.log("Error fatal: %s", error);
}