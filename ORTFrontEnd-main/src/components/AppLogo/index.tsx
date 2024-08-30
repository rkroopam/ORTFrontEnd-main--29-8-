import { CSSProperties, FC, PropsWithChildren } from "react"
import { Link } from "@mui/material"

interface Props extends PropsWithChildren {
    onClick: () => void
    style?: CSSProperties
}

export const AppLogo: FC<Props> = ({ onClick, style }) => {
    return (
        <Link style={{ cursor: 'pointer', ...style }} onClick={onClick} >
            <img style={{
                width: "auto",
                maxHeight: '64px'
            }} src="https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/c3784de1-f325-463c-aa4d-8777a6b0a7f9/OnlineReadingTutor_Logo.png.png?format=1500w" />
        </Link>
    )

}