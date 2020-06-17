import SparkMD5 from 'spark-md5';

export default function(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function(e) {
			resolve(SparkMD5.ArrayBuffer.hash(e.target.result));
		};
		reader.readAsArrayBuffer(file);
	});
}
