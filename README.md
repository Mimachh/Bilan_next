// Comment calculer mes compteurs : 
1 - J'ai un chiffre qui est un total sur l'année
2 - Ce chiffre je dois savoir où il en est aujourd'hui.
3 - Pour cela je dois l'incrémenter, j'ai donc une durée de refresh : par exemple la seconde, ou le vingtième de seconde.
4 - Si mon refresh est une seconde par exemple. Je dois calculer combien de secondes se sont écoulées entre aujourd'hui et la première seconde de l'année en cours. J'utilise le timestamp du 1er janvier de l'année en cours.
5 - Une fois que je sais combien de secondes (ou de vint millième de seconde..en fonction de mon refresh) se sont écoulées depuis le premier janvier. Je vais devoir calculer l'incrémentation de mon compteur sur chaque refresh. Je prend donc mon chiffre total sur l'année, je le divise par le nombre de seconde (ou de millième de seconde en fonction du refresh) qu'il y a dans l'année.
6 - Ensuite je multiplie le nombre a incrémenter par refresh par le nombre de secondes ( ou refresh ) depuis le début de l'année