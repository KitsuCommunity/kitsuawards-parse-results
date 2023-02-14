import { appendFileSync } from 'fs';
import { RESULTS_FILENAME } from '../constants';

export default function append(text: string, filename?: string) {
	appendFileSync(filename ?? RESULTS_FILENAME, `${text}\n\n`);
}
