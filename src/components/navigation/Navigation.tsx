import { BackIcon } from '../icons/Icons'
import './Navigation.scss'

export const MainNavigation=(props:any)=>{
  const {middle,right}=props
  return (
    <div className="main-navigation" {...props}>
      <div className="left">
        <div>
          <BackIcon/>
        </div>
        <div>
          Back
        </div>
      </div>
      <div className="middle">{middle||' '}</div>
      <div className="right">{right||' '}</div>
    </div>
  )
}
