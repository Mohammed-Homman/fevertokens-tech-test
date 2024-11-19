# fevertokens-tech-test

Before getting started, I’d like to express my gratitude for this opportunity and for the project itself. I’m genuinely excited about joining the team and eager to contribute to this work. Thank you again, and I’m looking forward to hear from you soon!

# Task 1 : Installing the App

First of all, you should clone my project : fevertokens-tech-test by running the command : git clone https://github.com/Mohammed-Homman/fevertokens-tech-test.
Second, you should get in the main folder : fevertokens-tech-test then acceding to the folder coins-catalog by running the command : cd fevertokens-tech-test/coins-catalog .
Third, you have to install the dependencies of the project by executing the following command : pnpm install.
Fourth, you should build the project using : pnpm run build.
Lastly, you have to launch the app by enabling a web server available on port 8000 by running the command : pnpm run start -- --port=8000.

so finnaly, the application should now be accessible at : http://localhost:8000.

# Task 2 : Algorithmic

# Python :

```

def task2():
   for i in range(1, 101):
    if i % 3 == 0 and i % 5 == 0 and i % 7 == 0:
        print("Hello World Yoo")
    elif i % 3 == 0 and i % 5 == 0:
        print("Hello World")
    elif i % 3 == 0 and i % 7 == 0:
        print("Hello Yoo")
    elif i % 5 == 0 and i % 7 == 0:
        print("World Yoo")
    elif i % 3 == 0:
        print("Hello")
    elif i % 5 == 0:
        print("World")
    elif i % 7 == 0:
        print("Yoo")
    else:
        print(i)
task2()


```

The illustration :
![alt text](/coins-catalog/public/task2_python.png)

---

# Java:

```
public class task2 {

    public static void main(String[] args) {
        task2();
    }

    public static void task2() {
        for (int i = 1; i <= 100; i++) {
            if (i % 3 == 0 && i % 5 == 0 && i % 7 == 0) {
                System.out.println("Hello World Yoo");
            } else if (i % 3 == 0 && i % 5 == 0) {
                System.out.println("Hello World");
            } else if (i % 3 == 0 && i % 7 == 0) {
                System.out.println("Hello Yoo");
            } else if (i % 5 == 0 && i % 7 == 0) {
                System.out.println("World Yoo");
            } else if (i % 3 == 0) {
                System.out.println("Hello");
            } else if (i % 5 == 0) {
                System.out.println("World");
            } else if (i % 7 == 0) {
                System.out.println("Yoo");
            } else {
                System.out.println(i);
            }
        }
    }
}

```

the iluustration is:

![alt text](/coins-catalog/public/task2_java.png)

# Task 3: Logic

I need to find my friend’s car on a very long road, but I don’t know which way to go. The road is endless, so I have to be careful not to drive too far in one direction without checking the other.
To find my friend, I will drive a little distance in one direction, then go back to where I started. Then, I’ll drive a bit farther in the other direction. Each time, I will go a little farther than before. This way, I’m slowly checking both sides of the road.
For example, I start at 0. I drive 100 km to the right. If my friend isn’t there, I go back to 0. Then I drive 200 km to the left. If my friend isn’t there, I go back to 0 again. Next, I drive 400 km to the right. Each time, I drive a little farther.
This way, I make sure I check every spot on the road. I’m going farther each time, so even if my friend is far away, I will reach him in a short time.
So, Finally, my logic is to drive farther each time, going back and forth. This way, I don’t miss any place on the road, and I will find my friend in a good amount of time, because already the highway is infinite + biderctionnal + infinite gas.

the illustration is :
![alt text](/coins-catalog/public/task3_illustration.jpg)
