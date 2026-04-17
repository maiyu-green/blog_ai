const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Android IPC';
pres.title = 'Android 跨进程通信(IPC)详解';

// 配色方案 - Ocean Gradient (适合技术主题)
const colors = {
    primary: "065A82",      // 深蓝色
    secondary: "1C7293",    // 青色
    accent: "21295C",       // 午夜蓝
    light: "E8F4F8",        // 浅蓝背景
    white: "FFFFFF",
    text: "1E293B",         // 深色文字
    muted: "64748B"         // 次要文字
};

// ========== 第1页：封面 ==========
let slide1 = pres.addSlide();
slide1.background = { color: colors.primary };

slide1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: colors.primary }
});

slide1.addText("Android 跨进程通信", {
    x: 0.5, y: 1.5, w: 9, h: 1,
    fontSize: 44, fontFace: "Arial Black", bold: true,
    color: colors.white, align: "center"
});

slide1.addText("(IPC) 机制详解", {
    x: 0.5, y: 2.5, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial",
    color: colors.white, align: "center"
});

slide1.addText("Android 5 到 16 期间 IPC 使用方式全解析", {
    x: 0.5, y: 3.5, w: 9, h: 0.5,
    fontSize: 18, fontFace: "Calibri",
    color: "CADCFC", align: "center"
});

// ========== 第2页：目录 ==========
let slide2 = pres.addSlide();
slide2.background = { color: colors.white };

slide2.addText("目录", {
    x: 0.5, y: 0.4, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

const tocItems = [
    { num: "01", title: "跨进程通信方式概览" },
    { num: "02", title: "Messenger 信使机制" },
    { num: "03", title: "AIDL 接口定义语言" },
    { num: "04", title: "ContentProvider 内容提供器" },
    { num: "05", title: "共享内存方案" },
    { num: "06", title: "Binder 驱动原理" }
];

let yPos = 1.4;
tocItems.forEach((item, index) => {
    // 序号圆圈
    slide2.addShape(pres.shapes.OVAL, {
        x: 0.8, y: yPos, w: 0.5, h: 0.5,
        fill: { color: colors.secondary }
    });
    slide2.addText(item.num, {
        x: 0.8, y: yPos, w: 0.5, h: 0.5,
        fontSize: 14, fontFace: "Arial", bold: true,
        color: colors.white, align: "center", valign: "middle"
    });
    
    // 标题
    slide2.addText(item.title, {
        x: 1.5, y: yPos + 0.1, w: 7, h: 0.4,
        fontSize: 20, fontFace: "Calibri",
        color: colors.text
    });
    
    yPos += 0.7;
});

// ========== 第3页：Linux IPC 机制 ==========
let slide3 = pres.addSlide();
slide3.background = { color: colors.white };

slide3.addText("Linux 原生 IPC 机制", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

const linuxIpc = [
    { name: "管道 (Pipe)", desc: "创建时分配 page 大小内存，缓冲区有限", icon: "📡" },
    { name: "信号 (Signal)", desc: "适用于进程中断控制，不适合信息交换", icon: "⚡" },
    { name: "信号量 (Semaphore)", desc: "作为锁机制，用于进程/线程同步", icon: "🔒" },
    { name: "共享内存", desc: "直接附加到虚拟地址空间，速度快但需同步", icon: "💾" },
    { name: "消息队列", desc: "信息复制两次，CPU 消耗大", icon: "📬" },
    { name: "套接字 (Socket)", desc: "通用接口，传输效率低", icon: "🔌" }
];

yPos = 1.2;
linuxIpc.forEach((item, index) => {
    // 背景卡片
    slide3.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: yPos, w: 4.2, h: 0.65,
        fill: { color: colors.light },
        line: { color: colors.secondary, width: 1 }
    });
    
    slide3.addText(item.name, {
        x: 0.7, y: yPos + 0.15, w: 3.8, h: 0.35,
        fontSize: 16, fontFace: "Arial", bold: true,
        color: colors.primary
    });
    
    yPos += 0.75;
});

// 右侧说明
slide3.addText("Android 在 Linux 内核基础上运行，因此 Linux 中的 IPC 机制在 Android 中基本都能使用。但由于性能和适用性限制，Android 提供了更高效的替代方案。", {
    x: 5, y: 1.5, w: 4.5, h: 3,
    fontSize: 14, fontFace: "Calibri",
    color: colors.text
});

// ========== 第4页：Android IPC 概览 ==========
let slide4 = pres.addSlide();
slide4.background = { color: colors.white };

slide4.addText("Android 特有 IPC 方式", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

// 中心 Binder 图示
slide4.addShape(pres.shapes.OVAL, {
    x: 4, y: 2.2, w: 2, h: 2,
    fill: { color: colors.primary }
});
slide4.addText("Binder", {
    x: 4, y: 2.95, w: 2, h: 0.5,
    fontSize: 20, fontFace: "Arial", bold: true,
    color: colors.white, align: "center"
});

// 周围组件
const binderComponents = [
    { name: "Messenger", x: 1, y: 1.5, color: colors.secondary },
    { name: "AIDL", x: 7, y: 1.5, color: colors.secondary },
    { name: "ContentProvider", x: 1, y: 3.5, color: colors.secondary },
    { name: "MemoryFile", x: 7, y: 3.5, color: colors.accent },
    { name: "SharedMemory", x: 4.5, y: 4.5, color: colors.accent }
];

binderComponents.forEach(comp => {
    slide4.addShape(pres.shapes.RECTANGLE, {
        x: comp.x, y: comp.y, w: 2, h: 0.6,
        fill: { color: comp.color },
        rectRadius: 0.1
    });
    slide4.addText(comp.name, {
        x: comp.x, y: comp.y + 0.15, w: 2, h: 0.3,
        fontSize: 14, fontFace: "Arial", bold: true,
        color: colors.white, align: "center"
    });
});

// 说明文字
slide4.addText("基于 Binder 实现", {
    x: 0.5, y: 5, w: 4, h: 0.4,
    fontSize: 12, fontFace: "Calibri",
    color: colors.secondary, align: "center"
});

slide4.addText("基于共享内存实现", {
    x: 5.5, y: 5, w: 4, h: 0.4,
    fontSize: 12, fontFace: "Calibri",
    color: colors.accent, align: "center"
});

// ========== 第5页：Messenger ==========
let slide5 = pres.addSlide();
slide5.background = { color: colors.white };

slide5.addText("Messenger - 轻量级 IPC", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

slide5.addText("Messenger 可以翻译为「信使」，通过它可以在不同进程中传递 Message 对象，底层实现是 AIDL。", {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: colors.text
});

// 客户端/服务端通信流程
slide5.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 1.8, w: 3.5, h: 3.2,
    fill: { color: colors.light },
    line: { color: colors.secondary, width: 2 }
});
slide5.addText("客户端", {
    x: 0.8, y: 1.9, w: 3.5, h: 0.4,
    fontSize: 18, fontFace: "Arial", bold: true,
    color: colors.primary, align: "center"
});

slide5.addShape(pres.shapes.RECTANGLE, {
    x: 5.7, y: 1.8, w: 3.5, h: 3.2,
    fill: { color: colors.light },
    line: { color: colors.secondary, width: 2 }
});
slide5.addText("服务端", {
    x: 5.7, y: 1.9, w: 3.5, h: 0.4,
    fontSize: 18, fontFace: "Arial", bold: true,
    color: colors.primary, align: "center"
});

// 通信箭头
slide5.addShape(pres.shapes.LINE, {
    x: 4.3, y: 2.8, w: 1.4, h: 0,
    line: { color: colors.secondary, width: 3 }
});
slide5.addText("→", {
    x: 4.8, y: 2.6, w: 0.5, h: 0.4,
    fontSize: 20, color: colors.secondary
});

slide5.addShape(pres.shapes.LINE, {
    x: 4.3, y: 3.5, w: 1.4, h: 0,
    line: { color: colors.accent, width: 3 }
});
slide5.addText("←", {
    x: 4.8, y: 3.3, w: 0.5, h: 0.4,
    fontSize: 20, color: colors.accent
});

// 客户端内容
const clientItems = [
    "serviceMessenger: 向服务发送消息",
    "clientMessenger: 接收服务返回",
    "ClientHandler: 处理服务端消息"
];
clientItems.forEach((item, i) => {
    slide5.addText("• " + item, {
        x: 1, y: 2.4 + i * 0.5, w: 3.1, h: 0.4,
        fontSize: 12, fontFace: "Calibri",
        color: colors.text
    });
});

// 服务端内容
const serverItems = [
    "ServerHandler: 处理客户端消息",
    "replyTo: 回复客户端",
    "主动推送消息"
];
serverItems.forEach((item, i) => {
    slide5.addText("• " + item, {
        x: 5.9, y: 2.4 + i * 0.5, w: 3.1, h: 0.4,
        fontSize: 12, fontFace: "Calibri",
        color: colors.text
    });
});

// ========== 第6页：AIDL ==========
let slide6 = pres.addSlide();
slide6.background = { color: colors.white };

slide6.addText("AIDL - 接口定义语言", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

slide6.addText("AIDL (Android Interface Definition Language) 用于定义客户端和服务端都认可的编程接口，实现跨进程方法调用。", {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: colors.text
});

// 代码示例框
slide6.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.8, w: 9, h: 3.5,
    fill: { color: "1E293B" },
    rectRadius: 0.1
});

slide6.addText("// IRemoteService.aidl", {
    x: 0.8, y: 2, w: 8, h: 0.3,
    fontSize: 11, fontFace: "Consolas",
    color: "64748B"
});

slide6.addText("interface IRemoteService {", {
    x: 0.8, y: 2.4, w: 8, h: 0.3,
    fontSize: 12, fontFace: "Consolas",
    color: "5EEAD4"
});

slide6.addText('    String getMessage(String clientMsg);', {
    x: 0.8, y: 2.7, w: 8, h: 0.3,
    fontSize: 12, fontFace: "Consolas",
    color: colors.white
});

slide6.addText("}", {
    x: 0.8, y: 3, w: 8, h: 0.3,
    fontSize: 12, fontFace: "Consolas",
    color: "5EEAD4"
});

// 关键特性
slide6.addText("关键特性", {
    x: 0.8, y: 3.5, w: 8, h: 0.3,
    fontSize: 14, fontFace: "Arial", bold: true,
    color: "5EEAD4"
});

const aidlFeatures = [
    "支持基本数据类型、String、List、Map、Parcelable",
    "in/out/inout 参数方向标记",
    "支持接口回调 (oneway 关键字)",
    "支持异常处理 (RemoteException)"
];

aidlFeatures.forEach((item, i) => {
    slide6.addText("• " + item, {
        x: 0.8, y: 3.9 + i * 0.35, w: 8, h: 0.3,
        fontSize: 11, fontFace: "Consolas",
        color: colors.white
    });
});

// ========== 第7页：ContentProvider ==========
let slide7 = pres.addSlide();
slide7.background = { color: colors.white };

slide7.addText("ContentProvider - 数据共享", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

slide7.addText("ContentProvider 用于在不同应用间共享数据，底层通过 Binder 实现，常用于访问系统数据（联系人、媒体等）。", {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: colors.text
});

// CRUD 操作
const crudOps = [
    { op: "query()", desc: "查询数据", color: "0D9488" },
    { op: "insert()", desc: "插入数据", color: "14B8A6" },
    { op: "update()", desc: "更新数据", color: "0891B2" },
    { op: "delete()", desc: "删除数据", color: "06B6D4" }
];

let xPos = 0.8;
crudOps.forEach((op, i) => {
    slide7.addShape(pres.shapes.RECTANGLE, {
        x: xPos, y: 2, w: 2, h: 1.2,
        fill: { color: op.color },
        rectRadius: 0.1
    });
    slide7.addText(op.op, {
        x: xPos, y: 2.3, w: 2, h: 0.4,
        fontSize: 16, fontFace: "Arial", bold: true,
        color: colors.white, align: "center"
    });
    slide7.addText(op.desc, {
        x: xPos, y: 2.7, w: 2, h: 0.3,
        fontSize: 12, fontFace: "Calibri",
        color: "E8F4F8", align: "center"
    });
    xPos += 2.3;
});

// URI 格式说明
slide7.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.5, w: 9, h: 1.5,
    fill: { color: colors.light },
    line: { color: colors.secondary, width: 1 }
});

slide7.addText("URI 格式: content://com.example.provider/table_name", {
    x: 1, y: 3.7, w: 8, h: 0.4,
    fontSize: 14, fontFace: "Consolas",
    color: colors.primary
});

slide7.addText("• 使用 Cursor 返回查询结果", {
    x: 1, y: 4.2, w: 8, h: 0.3,
    fontSize: 12, fontFace: "Calibri",
    color: colors.text
});

slide7.addText("• 支持权限控制，保护数据安全", {
    x: 1, y: 4.5, w: 8, h: 0.3,
    fontSize: 12, fontFace: "Calibri",
    color: colors.text
});

// ========== 第8页：共享内存 ==========
let slide8 = pres.addSlide();
slide8.background = { color: colors.white };

slide8.addText("共享内存方案", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

slide8.addText("共享内存是最快的 IPC 方式，无须复制数据，直接附加到进程虚拟地址空间。", {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: colors.text
});

// MemoryFile vs SharedMemory
slide8.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.8, w: 4.3, h: 3.5,
    fill: { color: colors.light },
    line: { color: colors.secondary, width: 2 }
});

slide8.addText("MemoryFile", {
    x: 0.5, y: 1.9, w: 4.3, h: 0.5,
    fontSize: 20, fontFace: "Arial", bold: true,
    color: colors.primary, align: "center"
});

const memFileItems = [
    "适用于 Android 5-7",
    "基于 ashmem 驱动",
    "ParcelFileDescriptor 传递",
    "需要手动同步"
];
memFileItems.forEach((item, i) => {
    slide8.addText("• " + item, {
        x: 0.7, y: 2.5 + i * 0.5, w: 3.9, h: 0.4,
        fontSize: 13, fontFace: "Calibri",
        color: colors.text
    });
});

slide8.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.8, w: 4.3, h: 3.5,
    fill: { color: colors.light },
    line: { color: colors.accent, width: 2 }
});

slide8.addText("SharedMemory", {
    x: 5.2, y: 1.9, w: 4.3, h: 0.5,
    fontSize: 20, fontFace: "Arial", bold: true,
    color: colors.accent, align: "center"
});

const sharedMemItems = [
    "Android 8+ (API 27)",
    "封装 MemoryFile",
    "更简洁的 API",
    "支持设置保护模式"
];
sharedMemItems.forEach((item, i) => {
    slide8.addText("• " + item, {
        x: 5.4, y: 2.5 + i * 0.5, w: 3.9, h: 0.4,
        fontSize: 13, fontFace: "Calibri",
        color: colors.text
    });
});

// ========== 第9页：Binder 原理 ==========
let slide9 = pres.addSlide();
slide9.background = { color: colors.white };

slide9.addText("Binder 驱动原理", {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Arial Black", bold: true,
    color: colors.primary
});

slide9.addText("Binder 是 Android 最核心的 IPC 机制，基于 Linux 的 mmap 内存映射实现，只需一次数据拷贝。", {
    x: 0.5, y: 1.1, w: 9, h: 0.5,
    fontSize: 14, fontFace: "Calibri",
    color: colors.text
});

// Binder 架构图
slide9.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.8, w: 2.5, h: 2,
    fill: { color: colors.secondary },
    rectRadius: 0.1
});
slide9.addText("客户端", {
    x: 0.5, y: 2.65, w: 2.5, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true,
    color: colors.white, align: "center"
});

slide9.addShape(pres.shapes.RECTANGLE, {
    x: 3.75, y: 1.8, w: 2.5, h: 2,
    fill: { color: colors.primary },
    rectRadius: 0.1
});
slide9.addText("Binder 驱动", {
    x: 3.75, y: 2.65, w: 2.5, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true,
    color: colors.white, align: "center"
});

slide9.addShape(pres.shapes.RECTANGLE, {
    x: 7, y: 1.8, w: 2.5, h: 2,
    fill: { color: colors.secondary },
    rectRadius: 0.1
});
slide9.addText("服务端", {
    x: 7, y: 2.65, w: 2.5, h: 0.4,
    fontSize: 16, fontFace: "Arial", bold: true,
    color: colors.white, align: "center"
});

// 箭头
slide9.addShape(pres.shapes.LINE, {
    x: 3, y: 2.8, w: 0.75, h: 0,
    line: { color: colors.accent, width: 3 }
});
slide9.addText("→", {
    x: 3.2, y: 2.6, w: 0.5, h: 0.4,
    fontSize: 20, color: colors.accent
});

slide9.addShape(pres.shapes.LINE, {
    x: 6.25, y: 2.8, w: 0.75, h: 0,
    line: { color: colors.accent, width: 3 }
});
slide9.addText("→", {
    x: 6.45, y: 2.6, w: 0.5, h: 0.4,
    fontSize: 20, color: colors.accent
});

// 特性
const binderFeatures = [
    "mmap 内存映射，仅一次拷贝",
    "基于 C/S 架构",
    "支持线程池管理",
    "安全性好（UID/PID 识别）"
];

binderFeatures.forEach((item, i) => {
    slide9.addText("✓ " + item, {
        x: 0.8, y: 4 + i * 0.4, w: 8.5, h: 0.35,
        fontSize: 13, fontFace: "Calibri",
        color: colors.text
    });
});

// ========== 第10页：总结 ==========
let slide10 = pres.addSlide();
slide10.background = { color: colors.primary };

slide10.addText("总结", {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 40, fontFace: "Arial Black", bold: true,
    color: colors.white, align: "center"
});

const summaryItems = [
    { title: "Messenger", desc: "轻量级，适合简单消息传递" },
    { title: "AIDL", desc: "复杂接口调用，支持双向通信" },
    { title: "ContentProvider", desc: "数据共享，CRUD 操作" },
    { title: "共享内存", desc: "大数据传输，性能最优" },
    { title: "Binder", desc: "Android IPC 的基石" }
];

yPos = 1.5;
summaryItems.forEach((item, i) => {
    slide10.addShape(pres.shapes.RECTANGLE, {
        x: 1.5, y: yPos, w: 7, h: 0.7,
        fill: { color: colors.secondary, transparency: 30 },
        rectRadius: 0.1
    });
    
    slide10.addText(item.title, {
        x: 1.8, y: yPos + 0.2, w: 2, h: 0.35,
        fontSize: 16, fontFace: "Arial", bold: true,
        color: colors.white
    });
    
    slide10.addText(item.desc, {
        x: 4, y: yPos + 0.22, w: 4, h: 0.3,
        fontSize: 14, fontFace: "Calibri",
        color: "CADCFC"
    });
    
    yPos += 0.8;
});

// 保存文件
pres.writeFile({ fileName: "Android_IPC_详解.pptx" });
console.log("PPT 已生成: Android_IPC_详解.pptx");
