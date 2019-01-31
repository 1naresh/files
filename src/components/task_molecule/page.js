
import React from 'react';

import rootObj from './data'

class TestComponent extends React.Component{
    state = {
        rootObj
    }
    changeState = (Key,level) =>{
        this.setState(state=>{
            if(level === 1){
                Object.keys(rootObj).map(key1=>{
                    if(key1 === Key){
                        rootObj[key1].showChilds = !rootObj[key1].showChilds
                    }else if(typeof(rootObj[key1]) === "object" ){
                        rootObj[key1].showChilds = false
                        Object.keys(rootObj[key1]).map(key2=>{
                            if(typeof(rootObj[key1][key2]) === "object" ) rootObj[key1][key2].showChilds = false
                            Object.keys(rootObj[key1][key2]).map(key3=>{
                                if(typeof(rootObj[key1][key2][key3]) === "object" ) rootObj[key1][key2][key3].showChilds = false
                                return null
                            })
                            return null
                        })
                    }
                    return null
                })
            }else if(level === 2){
                Object.keys(rootObj).map(key1=>{
                    Object.keys(rootObj[key1]).map(key2=>{
                        if(key2 === Key){
                            rootObj[key1][key2].showChilds = !rootObj[key1][key2].showChilds
                        }else if(typeof(rootObj[key1][key2]) === "object" ){
                            rootObj[key1][key2].showChilds = false
                            Object.keys(rootObj[key1][key2]).map(key3=>{
                                if(typeof(rootObj[key1][key2][key3]) === "object" ){
                                    rootObj[key1][key2][key3].showChilds = false
                                }
                                return null
                            })
                        }
                        return null
                    })
                    return null
                })
            }else if(level === 3){
                Object.keys(rootObj).map(key1=>{
                    Object.keys(rootObj[key1]).map(key2=>{
                        Object.keys(rootObj[key1][key2]).map(key3=>{
                            if(key3 === Key){
                               rootObj[key1][key2][key3].showChilds = !rootObj[key1][key2][key3].showChilds
                            }else if(typeof(rootObj[key1][key2][key3]) === "object" ){
                                rootObj[key1][key2][key3].showChilds = false
                            }
                            return null
                        })
                        return null
                    })
                    return null
                })
            }
            return state
        })
    }
    displayFolders = (obj) =>{
        let paddingLeft ;
        if(Object.keys(obj).length){
            return Object.keys(obj).map(Key=>{
                if(Key  !== "showChilds" && Key !== "level" ){
                    if(obj["level"] === 1)paddingLeft = "15px"
                    if(obj["level"] === 2)paddingLeft = "30px"
                    if(obj["level"] === 3)paddingLeft = "45px"
                    return(
                        <div key={Key} >
                            <div 
                                style={{paddingLeft,cursor:"pointer"}}
                                onClick={() => this.changeState(Key,obj[Key].level) } > 
                                { !obj[Key].showChilds && <i className="fas fa-file"></i>}
                                { obj[Key].showChilds && <i className="far fa-file"></i>}
                                {Key} 
                            </div>
                            { obj[Key].showChilds ? <div> { this.displayFolders(obj[Key]) }  </div> : null } 
                        </div>
                    )
                }else return null
            })
        }else{
            return null
        }
    }
    render(){
        return(
            <div style={{margin:"20px"}} >
                {this.displayFolders(this.state.rootObj)}
            </div>
        )
    }
}

export default TestComponent;