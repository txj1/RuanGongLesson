// 交互式学生信息管理系统测试

// 导入学生信息管理系统模块
const studentSystem = require('./studentManagementSystem');
// 导入readline模块用于交互式输入
const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 显示主菜单
function showMainMenu() {
    console.log('\n=== 学生信息管理系统 ===');
    console.log('1. 添加学生');
    console.log('2. 查询学生');
    console.log('3. 修改学生信息');
    console.log('4. 删除学生');
    console.log('5. 查看所有学生');
    console.log('0. 退出系统');
    console.log('=======================');
    
    rl.question('请选择操作 (0-5): ', (choice) => {
        handleMenuChoice(choice);
    });
}

// 处理菜单选择
function handleMenuChoice(choice) {
    switch (choice) {
        case '1':
            addStudentInteractive();
            break;
        case '2':
            queryStudentInteractive();
            break;
        case '3':
            updateStudentInteractive();
            break;
        case '4':
            deleteStudentInteractive();
            break;
        case '5':
            showAllStudents();
            break;
        case '0':
            console.log('感谢使用学生信息管理系统，再见！');
            rl.close();
            break;
        default:
            console.log('无效的选择，请重新输入！');
            showMainMenu();
    }
}

// 交互式添加学生
function addStudentInteractive() {
    console.log('\n=== 添加学生 ===');
    
    rl.question('请输入学生姓名: ', (name) => {
        rl.question('请输入学生学号: ', (id) => {
            rl.question('请输入学生年龄: ', (ageStr) => {
                const age = parseInt(ageStr);
                rl.question('请输入学生专业: ', (major) => {
                    const result = studentSystem.addStudent(name, id, age, major);
                    console.log(result.message);
                    if (result.success && result.student) {
                        console.log('添加的学生信息:', result.student);
                    }
                    showMainMenu();
                });
            });
        });
    });
}

// 交互式查询学生
function queryStudentInteractive() {
    console.log('\n=== 查询学生 ===');
    
    rl.question('请输入要查询的学生学号: ', (id) => {
        const result = studentSystem.queryStudentById(id);
        if (result.success) {
            console.log('查询结果: 找到学生信息');
            console.log('学生信息:', result.student);
        } else {
            console.log('查询结果:', result.message);
        }
        showMainMenu();
    });
}

// 交互式修改学生信息
function updateStudentInteractive() {
    console.log('\n=== 修改学生信息 ===');
    
    rl.question('请输入要修改的学生学号: ', (id) => {
        // 先查询学生是否存在
        const queryResult = studentSystem.queryStudentById(id);
        if (!queryResult.success) {
            console.log(queryResult.message);
            showMainMenu();
            return;
        }
        
        console.log('当前学生信息:', queryResult.student);
        
        rl.question('请输入新的年龄 (直接回车不修改): ', (ageStr) => {
            const age = ageStr.trim() ? parseInt(ageStr) : undefined;
            
            rl.question('请输入新的专业 (直接回车不修改): ', (major) => {
                const result = studentSystem.updateStudentById(id, age, major.trim() || undefined);
                if (result.success) {
                    console.log('修改结果:', result.message);
                    console.log('更新后的学生信息:', result.student);
                } else {
                    console.log('修改结果:', result.message);
                }
                showMainMenu();
            });
        });
    });
}

// 交互式删除学生
function deleteStudentInteractive() {
    console.log('\n=== 删除学生 ===');
    
    rl.question('请输入要删除的学生学号: ', (id) => {
        const result = studentSystem.deleteStudentById(id);
        console.log('删除结果:', result.message);
        showMainMenu();
    });
}

// 显示所有学生
function showAllStudents() {
    console.log('\n=== 所有学生信息 ===');
    
    const allStudents = studentSystem.getAllStudents();
    if (allStudents.length === 0) {
        console.log('当前没有学生信息');
    } else {
        console.log(`当前共有 ${allStudents.length} 名学生`);
        allStudents.forEach((student, index) => {
            console.log(`${index + 1}. ${student.name} (${student.id}) - ${student.age}岁，${student.major}`);
        });
    }
    
    showMainMenu();
}

// 启动交互式系统
console.log('欢迎使用学生信息管理系统！');
showMainMenu();

// 处理程序退出
rl.on('close', () => {
    process.exit(0);
});