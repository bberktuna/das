//NAVIGATION
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer , DarkTheme } from '@react-navigation/native';
import {createDrawerNavigator} from "@react-navigation/drawer";
//REDUX
import {Provider} from  "react-redux"
import {createStore} from "redux"
import {reducer} from "./src/redux/reducers/reducer"
//SCREENS
import {
  HomeScreen,
  PostDetailScreen,
  MessagesScreen,
  NotificationsScreen,
  SearchScreen,
  ProfileScreen,
  } from "./src/tab/index"
import {
  LoginScreen ,
  SignUpScreen
} from "./src/auth/index"
import {
  SettingsScreen,
  BookmarksScreen,
} from "./src/drawer/index"
//COMPONENTS
import {CustomDrawerContent} from "./src/CustomDrawerContent"
//OTHER
import React   from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Portal , FAB ,Provider as PaperProvider } from "react-native-paper"
import { useIsFocused } from '@react-navigation/native'


const store = createStore(reducer);

const StackHome = createStackNavigator();
const StackSearch = createStackNavigator();
const StackNotifications = createStackNavigator();
const StackMessages = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const StackApp = createStackNavigator();


const navOptionHandler = ()=> ({
  headerShown:false
})


function HomeStack(){
  return(
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name ="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name ="PostDetail" component={PostDetailScreen} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

function SearchStack(){
  return(
    <StackSearch.Navigator initialRouteName="Search" >
      <StackSearch.Screen name ="Search" component={SearchScreen} options={navOptionHandler} />
    </StackSearch.Navigator>
  )
}

function MessagesStack(){
  return(
    <StackMessages.Navigator initialRouteName="Messages" >
      <StackMessages.Screen name ="Profile" component={MessagesScreen} options={navOptionHandler} />
    </StackMessages.Navigator>
  )
}

function NotificationsStack(){
  return(
    <StackNotifications.Navigator initialRouteName="Notifications" >
      <StackNotifications.Screen name ="Notifications" component={NotificationsScreen} options={navOptionHandler} />
    </StackNotifications.Navigator>
  )
}


function TabNavigator(props){

  const routeName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : 'Search';

  const isFocused = useIsFocused();

  let icon = 'feather';

  switch (routeName) {
    case 'Messages':
      icon = 'email-plus-outline';
      break;
    default :
      icon = 'feather';
      break;

  }
  return(
<React.Fragment>
  <Tab.Navigator 
  shifting={true}
  screenOptions={({route}) => ({
  tabBarIcon:({color,size}) => {
    let iconName;
    if(route.name == "Home")
    { 
      iconName = "md-home"
    }
    else if(route.name =="Search")
    {
      iconName ="ios-search"
    }

    else if(route.name =="Notifications")
    {
      iconName ="ios-notifications"
    }
    else if (route.name =="Messages")
    {
      iconName="ios-chatboxes"
    }
    return <Icon name={iconName} style={{width:20 , height:20}} size={size} color={color} />
  }
})}

tabBarOptions= {{
  activeTintColor:"#6441A6",
  inactiveTintColor:"black"
}}
>
  <Tab.Screen name="Home" component={HomeStack} />  

  <Tab.Screen name="Search" component={SearchStack} />  
                  
  <Tab.Screen name="Notifications" component={NotificationsStack}/>

  <Tab.Screen name="Messages" component={MessagesStack} />

</Tab.Navigator>
          <Portal>
            <FAB
              visible={isFocused}
              icon={icon}
              style={{
                position: 'absolute',
                bottom: 100,
                right: 16,
              }}
              color="white"
            />
          </Portal>
</React.Fragment>
)
}



function DrawerNavigator({navigation}){
  return(
    <Drawer.Navigator initialRouteName="MenuTab" 
    drawerContent={()=> <CustomDrawerContent navigation={navigation}/>}>
        <Drawer.Screen name = "MenuTab" component={TabNavigator} />
        <Drawer.Screen name = "Profile" component={ProfileScreen} />
        <Drawer.Screen name = "Bookmarks" component={BookmarksScreen} />
        <Drawer.Screen name = "Settings" component={SettingsScreen} />
        <Drawer.Screen name = "Logout" component={LoginScreen} />
    </Drawer.Navigator>

  )
}



export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
            <StackApp.Navigator initialRouteName="Login" >
              <StackApp.Screen name ="HomeApp" component={DrawerNavigator} options={navOptionHandler} />
              <StackApp.Screen name ="Login" component={LoginScreen} options={navOptionHandler} />
              <StackApp.Screen name ="SignUp" component={SignUpScreen} options={navOptionHandler} />
            </StackApp.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

