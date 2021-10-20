const cds = global.cds || require('@sap/cds')
module.exports = async srv => {
    const messaging = await cds.connect.to('messaging'),
        { Notifications } = srv.entities


    // Mock events
    srv.after("CREATE", "Notifications", async msg => {
        const message = msg.message,
            employeeId = msg.employeeId,
            managerId = msg.managerId,
            skills = msg.skills,
            readStatus = msg.readStatus;
        await messaging.emit("referenceappscf/emsf/1909/sfemessage", msg);
        console.log('<< event emitted', msg);
        return cds.run(
            INSERT.into(Notifications).entries({
                message,
                employeeId,
                managerId,
                skills,
                readStatus
            })
        )
    });
