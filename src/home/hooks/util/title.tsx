import React, { useEffect, useState } from 'react';


const getTitle = (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('推送标题')
        }, 1000)
    })
}


const useWebTitle = () => {
    const [title, setTitle] = useState('');
    useEffect(() => {
        getTitle().then((res) => {
            setTitle(res);
        })
        return () => {
            setTitle('默认标题');
        }
    }, []);
    return [title, setTitle];
}


interface Props {
    extraTitle: string
}

const HOCTile = (WarpComponent) => {
    return class Title extends React.Component<Props> {
        state = {
            title: ''
        }
        componentDidMount() {
            getTitle().then((res) => {
                this.setState({ title: res })
            })
        }
        componentWillUnmount() {
            document.title = '默认标题';
        }
        render() {
            const { extraTitle, ...passThroughProps } = this.props;
            return (
                <div>
                    <span>{extraTitle}</span>
                    <WarpComponent title={this.state.title} {...passThroughProps} />
                </div>
            )
        }
    }
}

export { useWebTitle, HOCTile }