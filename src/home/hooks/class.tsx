import React from "react";
import ReactDOM from "react-dom";


interface initState {
    num: number,
}
export class Comp extends React.Component<{},initState > {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
        }
    //    this.addNum = this.addNum.bind(this);
    }
    componentDidMount() {
        this.setState({ num: this.state.num + 1 }) // 0
        console.log(this.state.num);
        this.setState({ num: this.state.num + 1 }) // 0
        console.log(this.state.num);
        setTimeout(() => { // 脱离了react控制，不再批量更新
            // this.setState({ num: this.state.num + 1 })
            // console.log(this.state.num); // 2
            // this.setState({ num: this.state.num + 1 })
            // console.log(this.state.num); // 3
            ReactDOM.unstable_batchedUpdates(() => { // 是React不会将异步代码里面的多次状态更新进行合并。 比如常见的setTimeout,Promise等等这些异步操作，在这些异步操作中更新多个状态的话，React就不会进行状态合并了 手动批量更新
                this.setState({ num: this.state.num + 1 })
                console.log(this.state.num); // 1
                this.setState({ num: this.state.num + 1 })
                console.log(this.state.num); // 1
            })
        }, 1000)
    }
    addNum = () => {
        console.log(this) // undefinded
        this.setState(preState => ({ num: preState.num + 1 })); 
    }

   render() {
    return (
        <div onClick={this.addNum}>class</div>
    )
   }
}
