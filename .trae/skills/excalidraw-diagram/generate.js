#!/usr/bin/env node
/**
 * Excalidraw Diagram Generator
 * 生成手绘风格的 Excalidraw JSON 格式图表
 */

const fs = require('fs');
const path = require('path');

// 生成基本的 Excalidraw 元素
function generateRectangle(id, x, y, width, height, text = '') {
  return {
    id,
    type: 'rectangle',
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: '#ffffff',
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: { type: 3 },
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1000000),
    isDeleted: false,
    boundElements: text ? [{ type: 'text', id: `${id}_text` }] : [],
    updated: Date.now(),
    link: null,
    locked: false
  };
}

function generateText(id, x, y, width, height, text) {
  return {
    id: `${id}_text`,
    type: 'text',
    x: x + width / 2,
    y: y + height / 2,
    width: text.length * 12,
    height: 25,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1000000),
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
    text,
    fontSize: 20,
    fontFamily: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
    baseline: 18,
    containerId: id,
    originalText: text,
    lineHeight: 1.25
  };
}

function generateArrow(id, x1, y1, x2, y2) {
  return {
    id,
    type: 'arrow',
    x: x1,
    y: y1,
    width: x2 - x1,
    height: y2 - y1,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1000000),
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
    points: [[0, 0], [x2 - x1, y2 - y1]],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: 'arrow',
    elbowed: false
  };
}

// 生成流程图
function generateFlowchart(steps) {
  const elements = [];
  const boxWidth = 200;
  const boxHeight = 80;
  const gap = 60;
  
  steps.forEach((step, index) => {
    const id = `box_${index}`;
    const x = 400;
    const y = 100 + index * (boxHeight + gap);
    
    elements.push(generateRectangle(id, x, y, boxWidth, boxHeight, step));
    elements.push(generateText(id, x, y, boxWidth, boxHeight, step));
    
    // 添加箭头（除了最后一个）
    if (index < steps.length - 1) {
      const arrowId = `arrow_${index}`;
      elements.push(generateArrow(arrowId, x + boxWidth / 2, y + boxHeight, x + boxWidth / 2, y + boxHeight + gap));
    }
  });
  
  return elements;
}

// 生成思维导图
function generateMindmap(centerTopic, branches) {
  const elements = [];
  const centerX = 500;
  const centerY = 400;
  const centerWidth = 200;
  const centerHeight = 80;
  
  // 中心节点
  const centerId = 'center';
  elements.push(generateRectangle(centerId, centerX - centerWidth / 2, centerY - centerHeight / 2, centerWidth, centerHeight, centerTopic));
  elements.push(generateText(centerId, centerX - centerWidth / 2, centerY - centerHeight / 2, centerWidth, centerHeight, centerTopic));
  
  // 分支节点
  const branchWidth = 150;
  const branchHeight = 60;
  const radius = 250;
  
  branches.forEach((branch, index) => {
    const angle = (index / branches.length) * 2 * Math.PI;
    const bx = centerX + Math.cos(angle) * radius - branchWidth / 2;
    const by = centerY + Math.sin(angle) * radius - branchHeight / 2;
    
    const branchId = `branch_${index}`;
    elements.push(generateRectangle(branchId, bx, by, branchWidth, branchHeight, branch));
    elements.push(generateText(branchId, bx, by, branchWidth, branchHeight, branch));
    
    // 连接线
    const lineId = `line_${index}`;
    elements.push(generateArrow(lineId, centerX + Math.cos(angle) * centerWidth / 2, centerY + Math.sin(angle) * centerHeight / 2, bx + branchWidth / 2 - Math.cos(angle) * 10, by + branchHeight / 2 - Math.sin(angle) * 10));
  });
  
  return elements;
}

// 生成完整的 Excalidraw 文件
function generateExcalidrawFile(elements) {
  return {
    type: 'excalidraw',
    version: 2,
    source: 'https://excalidraw.com',
    elements: elements,
    appState: {
      gridSize: null,
      viewBackgroundColor: '#ffffff'
    },
    files: {}
  };
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const type = args[0] || 'flowchart';
  const outputFile = args[1] || 'diagram.excalidraw';
  
  let elements = [];
  
  if (type === 'flowchart') {
    const steps = ['开始', '处理', '判断', '结束'];
    elements = generateFlowchart(steps);
  } else if (type === 'mindmap') {
    const center = '主题';
    const branches = ['分支1', '分支2', '分支3', '分支4'];
    elements = generateMindmap(center, branches);
  }
  
  const excalidrawData = generateExcalidrawFile(elements);
  fs.writeFileSync(outputFile, JSON.stringify(excalidrawData, null, 2));
  console.log(`✅ 已生成: ${outputFile}`);
  console.log(`📊 元素数量: ${elements.length}`);
  console.log('💡 提示: 用 https://excalidraw.com 打开此文件');
}

if (require.main === module) {
  main();
}

module.exports = {
  generateFlowchart,
  generateMindmap,
  generateExcalidrawFile
};
