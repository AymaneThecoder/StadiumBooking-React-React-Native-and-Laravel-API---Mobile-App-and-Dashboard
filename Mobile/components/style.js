import styled  from "styled-components";
import { View,Text, Image , TextInput,TouchableOpacity } from "react-native";
import  Constants   from "expo-constants";
import { StatusBar } from "expo-status-bar";
import Welcome from "../screens/Welcome";
const StatusBarHeight = Constants.StatusBarHeight;
//colors using in our app
export const Colors ={
primary:"#ffffff",
secondary:"#E5E7EB",
teritiary:"#1F2937",
darkLight:"#9CA3AF",
brand:"#418415",
green:"#10B981",
red:"#EF4444",
yellew:"#ffe234",
silver:"#C0C0C0",
lightgreen:"#2EFF2E",
lightOrange:"#FFD580",
black:"#000000",
};
const {primary , secondary, teritiary,darkLight,brand,green,red}=Colors;
export const StyledContainer = styled.View`
flex:1;
padding: 25px;

background-color:${primary} ;`; 
export const InnerContainer =styled.View`
flex:1;
width:100%;
align-items:center;` ;
export const WelcomeContainer = styled(InnerContainer)`
padding:25px;
padding-top:10px ;
justify-content:center;

` ;


export const PageLogo =styled.Image`
width:250px;
height:200px;` ;

export const Avatar =styled.Image `
width:100px;
height:100px;
margin:auto ;
border-radius:50px ;
border-width:2px;;
border-color :${secondary};
margin-bottom:10px ;
margin-top:10px ;`;

export const WelcomeImage=styled.Image `
height:50% ;
min-width:100% ;
`;
export const PageTitle =styled.Text`
font-size:30px;
text-align:center;
font-weight:bold;
color:${brand};
padding:10px ;

${(props)=> props.welcome && `
font-size:35px ;
`}
`;
export const SubTitle =styled.Text`
font-size:18px;
margin-botton:20px;
letter-spacing:1px;
font-weight:bold;
color:${teritiary};

${(props)=> props.welcome && `
margin-botton:5px ;
font-weight: normal ;
`}
`;
export const StyledFormArea=styled.View `
width:90%;`;
export const StyledTextInput =styled.TextInput`
background-color:${secondary};
padding:15px;
padding-left:55px;
padding-right:55px;
border-radius:5px ;
font-size:16px;
height:60px;
margin-vertical:3px;
margin-botton:10px;
color:${teritiary};`;
export const StyledInputLabel =styled.Text `
color:${teritiary};
font-size:13px;
text-align:left;`;
export const LeftIcon =styled.View `
left:15px;
top:38px;
position:absolute;
z-index:1 ;` ;
export const RightIcon =styled.TouchableOpacity`
right:15px;
top:38px;
position:absolute;
z-index:1 ;` ;
export const StyledButton =styled.TouchableOpacity`
padding :15px;
background-color:${brand};
justify-content: center;
align-items:center;
border-radius:5px;
margin-vertical:5px;
height:60px; 
${(props)=>props.google==true && `
background-color:${green};
flex-direction:row;
justify-content:center;`}
`;
export const ButtonText =styled.Text`
color:${primary};
font-size:16px;
${(props)=>props.google==true && `
 padding:25px;

`}`;

export const MsgBox =styled.Text`
text-align:center ;
font-size:13px;

`;
export const Line =styled.View `
height:1px ;
width :100% ;
background-color:${darkLight};
margin-vertical:10px;
`;
export const ExtraView =styled.View `
justify-content:center;
flex-direction:row;
align-items:center;
padding:10px;
`;
export const ExtraText =styled.Text `
justify-content:center;
font-size:15px;
align-content:center;
color:${teritiary}
`;
  export const TextLink =styled.TouchableOpacity `
  justify-content:center ;
  align-items:center;` ;
  export const TextLinkContent =styled.Text`
  color:${brand} ;
  font-size:15px;` ;