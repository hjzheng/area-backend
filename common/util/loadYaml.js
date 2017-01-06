import yaml from 'js-yaml';
import fs from 'fs';

export default function loadYaml(file) {

	try {
		const doc = yaml.load(
			fs.readFileSync(file, 'utf8')
		);

		return doc;
	} catch (e) {
		throw new Error(`can not load file ${file}`);
	}
}
