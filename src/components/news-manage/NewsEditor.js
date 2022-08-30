import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function NewsEditor(props) {

    useEffect(() => {
        //通过父组件给子组件传递的数居
        // console.log(props.content);
        const html = props.content
        if(html===undefined) return; //如果为undefined就直接返回
        //通过htmlToDraft转换成draft对象
        const contentBlock = htmlToDraft(html);
        if (contentBlock) { //如果有效的情况下
            //通过ContentState.createFromBlockArray去创建
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            //最终通过EditorState来进行更新
            const editorState = EditorState.createWithContent(contentState);

            //通过setEditorState将EditorState传进去
            setEditorState(editorState)
        }


    }, [props.content])
    const [editorState, setEditorState] = useState("")
    return (
        <div>
            <Editor
                editorState={editorState} //受控组件
                toolbarClassName="aaa"
                wrapperClassName="bbb"
                editorClassName="ccc"
                onEditorStateChange={(editorState) => setEditorState(editorState)} //每次更新的时候都会把editorState设置
                //失去焦点的时候拿到状态的值
                onBlur={() => {
                    // getCurrentContent获取到值后，同过convertToRaw转换一下，最后通过draftToHtml,draf对象转换成html
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
        </div>
    )
}
