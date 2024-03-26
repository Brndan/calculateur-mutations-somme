# Calculateur mutations intra Somme

Code javascript et formulaire pour calcul des barèmes des personnels enseignants mutations dans le département de la Somme.


## Typescript

Le code est réalisé en typescript. Pour compiler en javascript, 

```shell
tsc --strict 1d.tsc
tsc --strict  --removeComments --target es2022  1d.ts
```


Pour générer une page web statique intégrant les ressources, il est possible d’utiliser [monolith](https://github.com/Y2Z/monolith). Dans ce cas, il suffit à la racine du projet d’utiliser la commande `monolith src/1d.html -i -o calculateur.html`.

