// 学生信息管理系统

// 存储学生信息的内存数组
let students = [];

/**
 * 添加学生信息
 * @param {string} name - 学生姓名
 * @param {string} id - 学生学号
 * @param {number} age - 学生年龄
 * @param {string} major - 学生专业
 * @returns {object} - 添加结果对象
 */
function addStudent(name, id, age, major) {
    // 参数验证
    if (!name || typeof name !== 'string') {
        return { success: false, message: '姓名必须是非空字符串' };
    }
    if (!id || typeof id !== 'string') {
        return { success: false, message: '学号必须是非空字符串' };
    }
    if (!age || typeof age !== 'number' || age < 0) {
        return { success: false, message: '年龄必须是非负数字' };
    }
    if (!major || typeof major !== 'string') {
        return { success: false, message: '专业必须是非空字符串' };
    }

    // 检查学号是否已存在
    const existingStudent = students.find(student => student.id === id);
    if (existingStudent) {
        return { success: false, message: `学号 ${id} 已存在` };
    }

    // 创建新学生对象
    const newStudent = {
        name,
        id,
        age,
        major
    };

    // 添加到数组
    students.push(newStudent);
    return { success: true, message: `学生 ${name} 添加成功`, student: newStudent };
}

/**
 * 根据学号查询学生信息
 * @param {string} id - 学生学号
 * @returns {object} - 查询结果对象
 */
function queryStudentById(id) {
    if (!id || typeof id !== 'string') {
        return { success: false, message: '学号必须是非空字符串' };
    }

    const student = students.find(student => student.id === id);
    if (!student) {
        return { success: false, message: `未找到学号为 ${id} 的学生` };
    }

    return { success: true, student };
}

/**
 * 根据学号修改学生信息（年龄和专业）
 * @param {string} id - 学生学号
 * @param {number} age - 新的年龄（可选）
 * @param {string} major - 新的专业（可选）
 * @returns {object} - 修改结果对象
 */
function updateStudentById(id, age, major) {
    if (!id || typeof id !== 'string') {
        return { success: false, message: '学号必须是非空字符串' };
    }

    const student = students.find(student => student.id === id);
    if (!student) {
        return { success: false, message: `未找到学号为 ${id} 的学生` };
    }

    // 更新年龄（如果提供）
    if (age !== undefined) {
        if (typeof age !== 'number' || age < 0) {
            return { success: false, message: '年龄必须是非负数字' };
        }
        student.age = age;
    }

    // 更新专业（如果提供）
    if (major !== undefined) {
        if (typeof major !== 'string' || !major) {
            return { success: false, message: '专业必须是非空字符串' };
        }
        student.major = major;
    }

    return { success: true, message: `学号 ${id} 的学生信息更新成功`, student };
}

/**
 * 根据学号删除学生信息
 * @param {string} id - 学生学号
 * @returns {object} - 删除结果对象
 */
function deleteStudentById(id) {
    if (!id || typeof id !== 'string') {
        return { success: false, message: '学号必须是非空字符串' };
    }

    const initialLength = students.length;
    students = students.filter(student => student.id !== id);

    if (students.length === initialLength) {
        return { success: false, message: `未找到学号为 ${id} 的学生` };
    }

    return { success: true, message: `学号 ${id} 的学生信息已删除` };
}

/**
 * 获取所有学生信息
 * @returns {array} - 所有学生信息数组
 */
function getAllStudents() {
    return students;
}

// 导出所有功能函数
module.exports = {
    addStudent,
    queryStudentById,
    updateStudentById,
    deleteStudentById,
    getAllStudents
};