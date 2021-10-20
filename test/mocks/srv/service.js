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

    // srv.after("CREATE", "A_BusinessPartner", async data => {
    //     const payload = { KEY: [{ BUSINESSPARTNER: data.BusinessPartner }] };
    //     await messaging.emit("refapps/cpappems/abc/BO/BusinessPartner/Created", payload);
    //     console.log('<< event emitted', payload);
    // });



    // messaging.on('referenceappscf/emsf/1909/sfemessage', async msg => {
    //     const message = msg.headers.message,
    //         employeeId = msg.headers.employeeId,
    //         managerId = msg.headers.managerId,
    //         readStatus = msg.headers.readStatus;
    //     console.log('msg => emitting', msg)
    //     return cds.run(
    //         INSERT.into(Notifications).entries({
    //             message,
    //             employeeId,
    //             managerId,
    //             readStatus
    //         })
    //     )
    // });
}