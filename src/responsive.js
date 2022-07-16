import {css} from "@emotion/react"

export const mobile = (props) => {
    return css`
        @media screen and (max-width: 380px) { // Iphone X
            ${props}
        }
    `
}