const client = require('./client');

async function generateApiKeys(opts) {
    const body = await client.security.createApiKey({
        body: {
            name: 'salesLogger_key',
            role_descriptors: {
                earthquakes_example_writer: {
                    cluster: ['monitor'],
                    index: [
                    {
                        names: ['earthquakes'],
                        privileges: ['create_index', 'write', 'read', 'manage'],
                    },
                    ],
                },
            },
        },
    });

    console.log('body :>> ', body);
    return Buffer.from(`${body.id}:${body.api_key}`).toString('base64');
}

generateApiKeys()
    .then(console.log)
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });