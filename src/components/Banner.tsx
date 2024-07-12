import React from "react";

interface Props {
    
}
 
interface State {
    
}
 
class Banner extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { a :  1};
    }
    render() { 
        return (<div>
            woshi banner
        </div>);
    }
}
 
export default Banner;