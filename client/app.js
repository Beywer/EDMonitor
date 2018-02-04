import React from 'react';
import testImg from 'client/images/testImg.png';
import testStyles from 'client/test.css';

const test = 'asdfasdf';
const root = document.getElementById('root');

console.log(test, root, testImg, React);
root.innerText = test;

const img = document.createElement('img');
document.body.appendChild(img);
img.styleName = testStyles.testImage;
img.src = testImg;

console.log(testStyles);

