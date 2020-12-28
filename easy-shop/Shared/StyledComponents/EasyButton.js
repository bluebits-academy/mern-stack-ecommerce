import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #5cb85c;
        `
    }

    ${(props) =>
        props.secondary &&
        css`
            background: #62b1f6
        `
    }

    ${(props) => 
        props.danger &&
        css`
            background: #f40105
        `
    }

    ${(props) => 
        props.large &&
        css`
            width: 135px
        `
    }

    ${(props) => 
        props.medium &&
        css`
            width: 100px
        `
    }

    ${(props) => 
        props.small &&
        css`
            width: 40px
        `
    }
`;

export default EasyButton;

