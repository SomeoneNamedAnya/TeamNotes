import {Breadcrumb, Button, Flex, Table, Layout, Menu, theme,Typography } from 'antd';

const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

 export const HEADER_STYLE = {
    display:Flex,
    textAlign: "center",
    justify_content: "center",
    alignContent:"center",
    margin: '0 16px',
    padding: 0,
    background: colorBgContainer,
    fontSize: "50px",
    backgroundColor: '#944E63',
};

export const CONTENT_STYLE = {
    margin: '0 16px',
    height: "100%",
}

// export default HEADER_STYLE

// export default CONTENT_STYLE