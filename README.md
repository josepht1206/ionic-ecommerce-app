In this assessment I have built an E-commerce App based on what I have learnt from the training materials. I have learnt some basics of Ionic and Angular from the training. Ionic and Angular are frameworks used for web and mobile app development. Angular is a front-end JavaScript framework developed and maintained by Google which is used for building dynamic and responsive web applications while Ionic is a mobile app development framework that is built on top of Angular which provides developers with a set of pre-built UI components and tools for building cross-platform mobile apps.

From what I did, I have built an E-commerce App using the hybrid framework which are the Ionic and Angular. The code is programmed in Visual Studio Code IDE, and Android Studio to run the emulator and display the UI. The data are fetched from the Fake Store API which consist of details of products such as product name, description, category, price etc. The E-commerce App fulfilled some basic requirements. For instance, the users can launch the app and see a List of all products. They can tap on the products and view the product in detail. They can select categories populated from API and see the filtered products whenever they select the categories. Also, they can add the product into cart. In the cart page, it will show the total amount of the whole cart to purchase. Not only that, they users can adjust the quantity of the products to be purchased. Moreover, the users can remove the products from the cart. The users are always able to view the products that are added in the cart whenever the app restarts, so that the data is persistent. Lastly, by clicking a “checkout” button, the products in the cart will be cleared and the total amount will be reset.

Follow the following steps to launch the E-commerce App in **Web Browser** :
1. Download and extract the source code.
2. Open the source code in Visual Studio Code.
3. In the VSCode, open a new terminal.
4. Enter "npm install" to install necessary library.
5. After npm install in done, enter "ionic serve" to launch the app in browser.

Follow the following steps to launch the E-commerce App in **Android Emulator** :
1. Download and extract the source code.
2. Open the source code in Visual Studio Code.
3. In the VSCode, open a new terminal.
4. Enter "ionic build" to build your app.
5. Enter "ionic capacitor add android" to add the Android platform to your app.
6. Enter "ionic capacitor sync android" to synchronizes the native project with the web app project for an Android platform.
7. Enter "npx cap open android" to launch the Android Studio.
8. Lastly, run the project in Android Studio to open up the Android Emulator.

Note : Make sure you have your Android Emulator installed in Android Studio. 