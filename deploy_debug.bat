cd ./src
copy CNAME_debug CNAME
call ng build --output-hashing=all --configuration=debug

cd ..
call gh-pages -d ./dist/nfluent-wallet --repo https://github.com/f80dev/NFluentWallet_beta.git -f -t true -b gh-pages -m \"update from gh-pages\"
echo "Mise en ligne du client terminé"
