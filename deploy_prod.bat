cd ./src
copy CNAME_main CNAME
call ng build --aot --output-hashing=all

cd ..
call gh-pages -d ./dist/nfluent-wallet --repo https://github.com/f80dev/NFluentWallet.git -f -t true -b gh-pages -m "update from gh-pages"
echo "Mise en ligne du client terminé"
