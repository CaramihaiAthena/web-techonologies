const distance = (a, b) => {
	//TODO: implementați funcția
	// TODO: implement the function
	let costMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
	let n = a.length
	let m = b.length
	if (typeof(a) != "string" || typeof(b) != "string")
	{
		throw new Error('InvalidType');
	}
	else
	{
		for (let i = 0; i <= n; i += 1) {
			costMatrix[0][i] = i;
		}
		for (let j = 0; j <= m; j += 1) {
			costMatrix[j][0] = j;
		}
		for (let j = 1; j <= m; j += 1) {
			for (let i = 1; i <= n; i += 1) {
				let indicator = a[i - 1] === b[j - 1] ? 0 : 1;
				costMatrix[j][i] = Math.min(
				costMatrix[j][i - 1] + 1, // stergere
				costMatrix[j - 1][i] + 1, // adaugare
				costMatrix[j - 1][i - 1] + indicator, // modficare
				  );
			   }
			}
	}

		return costMatrix[m][n];
};	

// distance("hi", "hei")
// a = primul cuvant b = al doilea cuvant
// A - adaugarea unui caracter
// S - stergerea unui caracter
// M - modificarea unui caracter
// am nevoie de o matrice a costurilor (costMatrix?), 
// n - nr caractere din primul string, 
// m - nr de caracter din al doilea string



//prima rezolvare

	// n = a.length+1
	// m = b.length+1
	// costMatrix = []
	//we need to transform the first string into the second string =>
	// for(let i=1; i<n; i++) { //we iterate throw all the chars in the first string
	// 	for(let j=1; j<m; j++) {
	// 		if(a[i-1] === b[j-1]) {
	// 			costMatrix[i][j] = costMatrix[i-1][j-1]  //salt
	// 		}
	// 		else if (costMatrix[i-1][j-1] <= costMatrix[i-1][j] && costMatrix[i-1][j-1] <= costMatrix[i][j-1]){
	// 			costMatrix[i][j] = 1+costMatrix[i-1][j-1] //modificare
	// 		}
	// 		else if (costMatrix[i][j-1] <= costMatrix[i-1][j-1] &&  costMatrix[i][j-1] <= costMatrix[i-1][j]) {
	// 			costMatrix[i][j] = 1+costMatrix[i][j-1] //adaugare
	// 		}
	// 		else {
	// 			costMatrix[i][j] = 1+costMatrix[i-1][j] //stergere
	// 		}
	// 	}
	// }

	// return costMatrix[n][m]
//}





module.exports.distance = distance