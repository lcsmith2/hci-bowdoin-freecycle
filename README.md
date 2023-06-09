# Bowdoin FreeCycle
Link to repository: https://github.com/lcsmith2/hci-bowdoin-freecycle

This repository contains the code for a prototype of an online interface for Bowdoin FreeCycle. We used local storage to imitate a back-end for the project.

## Start the Web Server and View the Website
If you just want to view the prototype, you can visit: https://lcsmith2.github.io/hci-bowdoin-freecycle/.

There are a few extra steps to host the server from your local machine. First, download the files from this repository and save them to a location you'll remember.
Then, in order for the website to function properly, you must start a server for it.

If you don't have Python installed, you will need it for the web server. Instructions for installing Python 3 can be found [here](https://realpython.com/installing-python/).

Open the terminal and navigate to the directory containing the files you just downloaded and cd inside that directory. So, if you were to list the files, you should see all of the `.html` files (`creating-listing.html`, `dashboard.html`, etc). ([Here](https://terminalcheatsheet.com/guides/navigate-terminal) is a link for how to navigate directories within the terminal.) Once you have navigated to the correct location via the terminal, start the web server by running `python3 -m http.server` if you have Python 3 or `python -m SimpleHTTPServer` if you have Python 2 in the terminal. If this step is successful, you should see the following message: `Serving HTTP on :: port 8000 (http://[::]:8000/) ...`. 

Finally, open your browser and go to `http://localhost:8000` to view the website. 

Note: the code for the website has only been tested on Firefox and Chrome and may not work for other browsers.

## Login
Although you can browse whenever, in order to take full advantage of the many features of FreeCycle, you need to log in. Although any username and password work for our example (we didn't want to run into password storing security risks), ideally you would use your Bowdoin username so that people know who to contact for items! 

Logging in allows you to view your item dashboard (and see which items you have posted for FreeCycle as well as the items you have requested). The dashboard allows you to cancel requests and delete items you've posted as well. 

It also lets you actually make requests on items instead of simply browsing!

## Search or Filter Listings
When you first reach the homepage of FreeCycle, you'll see several different category options for browsing, including kitchen, dorm, furniture, school, and other/miscellaneous. Feel free to click on any of those to get started!

However, on the listings page, you can not only scroll through the whole listings catalog, but you can also choose to search or filter listings further. You can filter by item category, condition of item, and price. You can also search for terms in the item name or description (for example, "kettle
). Note: you may choose to search OR filter at any given time. If you filter, the filters you applied will show up on the screen so that you can keep track. 

## Request an Item
Once you've found an item you like (however you like!), you can click on its details button in order to get more information as well as request the item. If you decide you don't want to request it after seeing more details, just click close or exit the popup window. 

If you were successful (ie you have not already requested the item and there is a sufficient quantity remaining), this item will show up on your dashboard as 'requested.'

## Create a Listing
To create a listing, be logged in and navigate to the 'Create a listing' tab. Fill out the form with item information (don't worry, if you omit something you will be prompted to fix it), and then you will be able to see your item in Listings and on your dashboard.


## Still Confused?
If you're confused at any time while using the FreeCycle site, click on the "How it Works" tab for usage instructions.
