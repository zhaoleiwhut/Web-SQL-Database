'use strict';

// 1.数据库名称
// 2.版本号
// 3.描述文本
// 4.数据库大小
// 5.创建回调
var db = openDatabase('mydb', '1.0', 'Test DB', 5 * 1024 * 1024, function () {
    console.log('创建数据库成功');
});

var tbName = 'mytb';
var createTable = function () {
    db.transaction(function (tx) {
        // tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tbName + ' (id unique, ser, mess)');
    });
};
var insertData = function () {
    db.transaction(function (tx) {
        var items = ['中国', '美国', '日本', '英国'];
        var count = 100;
        while (count > 0) {
            let ser = Math.floor(Math.random() * 4);
            // 防止出现边界值4
            if (ser === 4) {
                continue;
            }
            count -= 1;
            // tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "hello world")');
            tx.executeSql('INSERT INTO ' + tbName + ' (id, ser, mess) VALUES (?, ?, ?)', [count, ser, items[ser]]);
        }
    });
};

var deleteData = function () {
    db.transaction(function (tx) {
        // tx.executeSql('DELETE FROM LOGS  WHERE id=1');
        tx.executeSql('DELETE FROM ' + tbName + ' WHERE id=?', [1]);
    });
};

var updateData = function () {
    db.transaction(function (tx) {
        // tx.executeSql('UPDATE LOGS SET log=\'www.w3cschool.cc\' WHERE id=2');
        tx.executeSql('UPDATE ' + tbName + ' SET log=\'www.w3cschool.cc\' WHERE id=?', [2]);
    });
};

var selectData = function () {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM ' + tbName, [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
                console.log(results.rows.item(i));
            }
        }, null);
    });
};
