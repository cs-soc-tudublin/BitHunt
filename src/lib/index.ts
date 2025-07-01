// place files you want to import through the `$lib` alias in this folder.

/**
 * Pluralises a word based on English grammar rules.
 * @param word The word to pluralise.
 * @return The pluralised form of the word.
 */
export function pluralise(word: string) {
	// I really, really hate English grammar rules.
	if (word.endsWith('s')) {
		return word;
	} else if (
		word.endsWith('x') ||
		word.endsWith('z') ||
		word.endsWith('ch') ||
		word.endsWith('sh')
	) {
		return word.slice(0, -1) + 'es';
	} else if (word.endsWith('y')) {
		return word.slice(0, -1) + 'ies';
	} else if (word.endsWith('f')) {
		return word.slice(0, -1) + 'ves';
	} else if (word.endsWith('fe')) {
		return word.slice(0, -2) + 'ves';
	} else if (word.endsWith('o')) {
		return word + 'es';
	} else {
		return word + 's';
	}
}
