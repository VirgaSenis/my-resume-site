import FolderImg from './images/folder.svg';
import PDFImg from './images/pdf.svg';
import TextFileImg from './images/textfile.png';
import Resume from './pdf/resume.pdf';
import WorkHistory from './data/work_history.json';
import Education from './data/education.json';
import TechSkills from './data/technical_skills.json';
import Note from './data/notes.json';
import './css/App.css';
import React from 'react';
import Window from './Window.js';

function Icon(props) {
    return (
        <figure className='Icon' onClick={props.onClick}>
            <img src={props.img} className='icon-img' alt='icon' />
            <figcaption>{props.caption}</figcaption>
        </figure>
    );
}

function Folder(props) {
    return (
        <Icon
            img={FolderImg}
            caption={props.caption}
        />
    )
}

function PDF(props) {
    return (
        <a className='pdf' href={Resume} download>
            <Icon
                img={PDFImg}
                caption={props.caption}
            />
        </a>
    )
}

function TextFile(props) {
    return (
        <Icon
            img={TextFileImg}
            caption={props.caption}
            onClick={props.onClick}
        />
    );
}

function WorkHistoryContent(props) {
    return (
        <div>{WorkHistory.map((history, index) => {
            return (
                <div key={index}>
                    <div>{history.position}</div>
                    <div>{history.company}</div>
                    <div>{history.date}</div>
                    <ul>
                        {history.bullet_point.map(point => {
                            return (
                                <li key={point}>{point}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        })}
        </div>
    )
}

function EducationContent(props) {
    return (
        <div>{Education.map((education, index) => {
            return (
                <div key={index}>
                    <div>{education.institution}</div>
                    <div>{education.date}</div>
                    <div>{education.degree}</div>
                    <ul>
                        {education.bullet_points.map(point => {
                            return (
                                <li key={point}>{point}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        })}
        </div>
    )
}

function TechnicalSkillsContent(props) {
    return (
        <div>{TechSkills.map((skills, index) => {
            return (
                <div key={index}>
                    <div>{skills.area}</div>
                    <ul>{skills.bullet_points.map(point => {
                        return (
                            <li key={point}>{point}</li>
                        )
                        })}
                    </ul>
                </div>
            )
        })}
        </div>
    )
}

function StickyNote(props) {
    return (
        <div className="Sticky-note">
            <header className="header" />
            <div>
            <ul>
                {Note.map(point => {
                    return (
                        <li key={point}>{point}</li>
                    )
                })}
            </ul>
            </div>

        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windows: Array(3).fill(false),
        };
    }

    openWindow(i) {
        const windows = this.state.windows.slice();
        windows[i] = true;

        this.setState({
            windows: windows
        });
    }

    closeWindow(i) {
        const windows = this.state.windows.slice();
        windows[i] = false;

        this.setState({
            windows: windows
        });
    }

    render() {
        return (
            <div className="App">
                <div className="Desktop">
                    <StickyNote></StickyNote>
                    <header className="App-header">
                        {/* <Folder caption="Projects" /> */}
                        <TextFile caption="Employment History" onClick={() => this.openWindow(0)} />
                        <TextFile caption="Education" onClick={() => this.openWindow(1)} />
                        <TextFile caption="Technical Skills" onClick={() => this.openWindow(2)} />
                        <PDF caption="Download Resume" />
                    </header>
                </div>
                <Window content={<WorkHistoryContent/>} openWindow={this.state.windows[0]} onCloseBtnClick={() => this.closeWindow(0)} />
                <Window content={<EducationContent/>} openWindow={this.state.windows[1]} onCloseBtnClick={() => this.closeWindow(1)}/>
                <Window content={<TechnicalSkillsContent/>} openWindow={this.state.windows[2]} onCloseBtnClick={() => this.closeWindow(2)} />
            </div>
        );
    }
}

export default App;
