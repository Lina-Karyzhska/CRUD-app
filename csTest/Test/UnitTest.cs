using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System.Threading;
using OpenQA.Selenium.Chrome;

namespace Test1
{
    public class Tests
    {
        IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://arcane-ravine-92848.herokuapp.com/authorisation");
            driver.Manage().Window.Maximize();
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);
        }

        [TearDown]
        public void Quit()
        {
            driver.Quit();
        }

        [Test]
        public void FailSignUp()
        {
            driver.FindElement(By.XPath("//a[contains(text(), 'Sign up')]")).Click();

            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).SendKeys("111");
            bool firstCheck = driver.FindElement(By.XPath("//div[@id='sign-up-password']")).Text.Contains("Password must contain at least four characters");

            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).Clear();
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).SendKeys("1111");
            bool secondCheck = driver.FindElement(By.XPath("//div[@id='sign-up-password']")).Text.Contains("Password must contain at least one letter");

            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).Clear();
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).SendKeys("1111q!");
            bool thirdCheck = driver.FindElement(By.XPath("//div[@id='sign-up-password']")).Text.Contains("Password can not contain special characters");

            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).Clear();
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).SendKeys("qqqq");
            bool fourthCheck = driver.FindElement(By.XPath("//div[@id='sign-up-password']")).Text.Contains("Password must contain at least one digit");

            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).Clear();
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).SendKeys("1111q");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Repeat password']")).SendKeys("1111");
            bool fifthCheck = driver.FindElement(By.XPath("//div[@id='sign-up-repeat-password']")).Text.Contains("Passwords are not equal");

            Assert.IsTrue(firstCheck && secondCheck && thirdCheck && fourthCheck && fifthCheck);
        }
        
        [Test]
        public void SignUp() 
        {
            String url = driver.Url;

            driver.FindElement(By.XPath("//a[contains(text(), 'Sign up')]")).Click();

            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@name='email']")).SendKeys("lina.dronova.s@gmail.com");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Password']")).SendKeys("1111q");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-signup']//input[@placeholder='Repeat password']")).SendKeys("1111q" + Keys.Enter);

            Thread.Sleep(3000);
            Assert.IsTrue(!url.Equals(driver.Url));
        }

        [Test]
        public void CreateProfile() 
        {
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@name='email']")).SendKeys("lina.dronova.s@gmail.com");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@placeholder='Password']")).SendKeys("1111q" + Keys.Enter);
            
            Thread.Sleep(500);
            int length = driver.FindElements(By.XPath("//tr")).Count;

            driver.FindElement(By.XPath("//button[@id='create']")).Click();
            IAlert alert = driver.SwitchTo().Alert();

            if (alert == null) 
            {
                Assert.IsTrue(false);
            }

            alert.Accept();
            driver.FindElement(By.XPath("//tr[@id='0']//input[@name='name']")).SendKeys("Polina");
            driver.FindElement(By.XPath("//tr[@id='0']//input[@name='city']")).SendKeys("Brovary");
            driver.FindElement(By.XPath("//button[@id='create']")).Click();

            Thread.Sleep(500);
            Assert.IsTrue(length < driver.FindElements(By.XPath("//tr")).Count, $"{length}, {driver.FindElements(By.XPath("//tr")).Count}");
        }

        [Test]
        public void DeleteProfile()
        {
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@name='email']")).SendKeys("lina.dronova.s@gmail.com");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@placeholder='Password']")).SendKeys("1111q" + Keys.Enter);

            Thread.Sleep(500);
            int length = driver.FindElements(By.XPath("//tr")).Count;

            driver.FindElement(By.XPath("//tr[@id='1']//button[contains(text(), 'Delete')]")).Click();

            Thread.Sleep(500);
            Assert.IsTrue(length > driver.FindElements(By.XPath("//tr")).Count, $"{length}, {driver.FindElements(By.XPath("//tr")).Count}");
        }

        [Test]
        public void FailLogIn()
        {
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@name='email']")).SendKeys("lina.dronova.s@gmail");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@placeholder='Password']")).SendKeys("1111q" + Keys.Enter);
            IAlert alert = null;
            new WebDriverWait(driver, TimeSpan.FromSeconds(5)).Until(e => {
                alert = e.SwitchTo().Alert();
                return true;
            });

            Assert.IsNotNull(alert);
        }

        [Test]
        public void LogIn()
        {
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@name='email']")).SendKeys("lina.dronova.s@gmail.com");
            driver.FindElement(By.XPath("//div[@id='tab-tabpane-login']//input[@placeholder='Password']")).SendKeys("1111q" + Keys.Enter);
            driver.FindElement(By.XPath("//h2[contains(text(), 'Your profiles:')]"));
        }
    }
}