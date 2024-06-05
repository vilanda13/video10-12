const fs = require('fs');
const chalk = require('chalk');

// Membaca dan memuat daftar kontak dari file
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}

// Menyimpan kontak baru ke dalam file
const simpanContact = (nama, email, noHP) => {
    const contacts = loadContact(); // Memuat daftar kontak dari file
    const contact = { nama, email, noHP };

    // Mengecek duplikasi berdasarkan nama
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Kontak sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    // Menyimpan kontak baru ke dalam daftar kontak
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('Terima kasih sudah memasukkan data.'));
    return true;
};

// Menampilkan daftar kontak
const listContact = () => {
    const contacts = loadContact(); // Memuat daftar kontak dari file
    console.log(chalk.cyan.inverse.bold('Daftar Kontak:'));
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

// Menampilkan detail kontak berdasarkan nama
const detailContact = (nama) => {
    const contacts = loadContact(); // Memuat daftar kontak dari file
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if (!contact) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if (contact.email) {
        console.log(contact.email);
    }
};

// Menghapus kontak berdasarkan nama
const deleteContact = (nama) => {
    let contacts = loadContact(); // Memuat daftar kontak dari file
    const filteredContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length === filteredContacts.length) {
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(filteredContacts));
    console.log(chalk.green.inverse.bold(`Kontak dengan nama ${nama} berhasil dihapus!`));
    return true;
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
