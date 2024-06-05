const yargs = require('yargs');
const contacts = require('./contacts');

yargs.command({
    command: 'add',
    describe:'Menambahkan concat baru',
    builder: {
        nama:{
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
           describe: 'noHP',
           demandOption: true,
           type: 'string',
        },
        noHP: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
        }
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP)
    }
}).demandCommand();

// menampilkan daftar semua nama & no hp contact
yargs.command({
    command: 'list',
    describe:'Menampilkan emua nama & no hp contact',
    handler() {
        contacts.listContact();
    },
});

// menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe:'Menampilkan detail sebuah contact berdasarkan nama',
    builder: {
        nama:{
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) {
        contacts.detailContact(argv.nama);
    },
});

// menghapus contact berdasarkan nama
yargs.command({
    command: 'delete',
    describe:'Menghapus contact berdasarkan nama',
    builder: {
        nama:{
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) {
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();