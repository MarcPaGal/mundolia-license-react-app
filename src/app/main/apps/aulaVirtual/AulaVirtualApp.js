import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef,useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {submitFileClassroom,getFileClassroom,getMeetingId,getGroupsStudent,getGroups,downloadFile} from './store/aulaSlice.js';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import UserInfoHeader from '../preescolar/components/UserInfoHeader';
import { Component } from 'react';
import Carousel from 'react-elastic-carousel';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time



const useStyles = makeStyles({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	exportButton: {
		position: 'absolute',
		right: 80,
		bottom: 12,
		zIndex: 99
	},
	img: {
        width:100,
        position:"absolute",
        margin:"1%",
	},
	imgHeader: {
		maxHeight: "20%",
		maxWidth: "20%",
	},
    imgBackgroundStyle: {
        backgroundImage: "url(assets/images/backgrounds/_0012_Vector-Smart-Object.png)",backgroundSize:"cover",position:"relative",height:"80%",backgroundSize:"cover",
        width: '100%',
        height: '100%',
    },
    containerStyle: {
        width: '100%',
        height: '100%',
    },
    rightContainerStyle: {
        overflowY:"scroll",
        width: '100%',
        height: '100%',
    },
    jitsiContainerOpen: {
        display: 'block',
        width: '100%',
        height: '100%',
    },
    fileNameStyle: {
        color:"#FFF",
        textShadow:"-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;"
    },
	button: {
		"&:hover": {
			transform: "scale(1.2) translateX(50px)"
			// width:"120%"
		},
		justifyContent:"left"
	},
	groupButton:{
        backgroundColor:"#4883C0",
        color:"white",
        marginLeft:"5%"
    },
	groupTitle:{
        color:"white",
        margin:"5%"
    },
    groupDivButtons:{
        width:"100%"
    },
    videoScreen: {
        marginTop: "40px",
        // margin-top: 40px,
        //height: "63vh"
        height: "55vh",
        maxWidth: "40vw",
    //max-width: "49vw";
        marginLeft: "-27px",
    //margin-left: -27px;
        marginTop: "95px",
    //margin-top: 95px;
    //margin-left: -27px;
    },
    imgBackgroundStyle2: {
        backgroundImage: "url(assets/images/backgrounds/_0008_nave-frente.png)",backgroundSize:"cover",position:"relative",height:"80%",backgroundSize:"cover",
        //width: '80% !important',
        //height: '100%',
        //marginTop: '48px',
        // width: "57vw !important",
        width: "42vw !important",
        marginLeft: "-12px",
        height: "40vh",
        marginTop: "-42px"
        //marginLeft: '10%'
    },
    elementDown: {
        marginLeft: '111px',
        marginTop: '26px',
         height: '117px',
         width: '17%'
        // width: '80%'
    },
    anotherelementDown: {
        marginTop: '57px'
    },
    imgBackgroundStyle3: {
        backgroundImage: "url(assets/images/backgrounds/_0007_Objeto-inteligente-vectorial.png)",backgroundSize:"cover",position:"relative",height:"80%",backgroundSize:"cover",
        //width: '80% !important',
        // width: '464% !important',
        // width: '396px !important',
        width: '29vw !important',
        height: '100%',
        marginTop: '48px',
        marginLeft: '86px'
    },
    resourcesRight: {
        width: "10vw",
    height: "100vh"
    },
    
});

   /*  const state = {
      items: [
        {id: 1, title: 'item #1'},
        {id: 2, title: 'item #2'},
        {id: 3, title: 'item #3'},
        {id: 4, title: 'item #4'},
        {id: 5, title: 'item #5'}
      ]
    }
    const { items } = this.state; */

    var hideConsole = true;
    var gamesShow = true;

function AulaVirtualApp(props) {
	const dispatch = useDispatch();
    var hideBar = 0;
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [openMeeting, setOpenMeeting] = useState(false);
	const [openGroups, setOpenGroups] = useState(false);
	const [valueGroups, setValueGroups] = useState("");

	const user = useSelector(({ auth }) => auth.user.data);
	const role = user.role;
	const aula = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.filesAula);
    console.log('aul',aula);
	const meetingIdVal = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.meetingAula);
	const groupsTeacher = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.groups);

    useEffect(() => {
        if(meetingIdVal.success){
            setOpenGroups(false);
            createJitsiMeet(meetingIdVal.response.meeting_id);
            dispatch(getFileClassroom(meetingIdVal.response.meeting_id));
            setOpenMeeting(true);
		}
    }, [meetingIdVal]);
     
    useEffect(() => {
        if(groupsTeacher.success){
            setOpenGroups(true);
            setValueGroups(groupsTeacher.response);
        }
    }, [groupsTeacher.success,groupsTeacher.error]);

	useDeepCompareEffect(() => {
        setOpenMeeting(false);
        if('id' in routeParams && routeParams.id !== "all"){
            createJitsiMeet(routeParams.id);
            dispatch(getFileClassroom(routeParams.id));
            setOpenMeeting(true);
        }else{
            if(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A'){
                dispatch(getGroups());
            }else if(role === 'alumno' || role === 'alumno_secundaria' ||  role === 'preescolar' || role === 'alumnoe0' || role === 'alumnoe1' || role === 'alumnoe2' || role === 'alumnoe3' || role === 'Alumno-I' || role === 'Alumno-M' || role === 'Alumno-A'){
                dispatch(getGroupsStudent());
            }
        }
    }, [dispatch, routeParams]);

	function createJitsiMeet(meetId){
        try {
            const domain = 'meet.jit.si';
            const options = {
            roomName: meetId,
            parentNode: document.getElementById('jitsi-container'),
            userInfo: {
                email: user.email,
                displayName: user.username
            },
            interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
            },
            configOverwrite: {
            disableSimulcast: false,
            },
            };
        
            const api = new window.JitsiMeetExternalAPI(domain, options);
            api.addEventListener('videoConferenceJoined', () => {
            //  api.executeCommand('displayName', user.username);
            });
        
        } catch (error) {
        console.error('Failed to load Jitsi API', error);
        }
	}

    function uploadFile(file){
        dispatch(submitFileClassroom(file, meetingIdVal.response.meeting_id));
    }

    function onClickGroup(id){

        setOpenGroups(false);
        dispatch(getMeetingId(id));
    }

    function loadGame (){
        hideBar = 0;
    }

    let state = {
        activeDrags: 0,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: -400, y: 200
        }
      };

      function consol() { //hideBar = 1;
        hideConsole = false;
        gamesShow = true;
        console.log("hide", gamesShow);
          console.log('1234!'); }

    function onStart  ()  {
        this.setState({activeDrags: ++this.state.activeDrags});
      };

    function  onStop ()  {
        this.setState({activeDrags: --this.state.activeDrags});
      };


      var state2 = {
        items: [
          
        ]
      }
      const { items } = state2;
    //   const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

	return (
		<>
            {
           /* <DragDropContext onDragEnd={(result)=>console.log(result)}></DragDropContext> */}
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={ 
                    <div className={classes.imgBackgroundStyle}>   
                        {/* <div className="float flex w-full flex-wrap "> */}
                            {/* <div className="flex w-full md:w-1/2">
                                <Button
                                    className={clsx(classes.button)}
                                    style={{
                                        backgroundColor: 'transparent',
                                    }}
                                    to={`/apps/landing`}
                                    component={Link}
                                    type="button"
                                >
                                    <img className={clsx(classes.imgHeader)} src="assets/images/preescolar/artes-1.png" />
                                </Button>
                                <div style={{display : 'block'}}>
                                    <Typography className={clsx(classes.TextTitle)}>	
                                        Mis Clases 
                                    </Typography>
                                    </div>
                            </div> */}
                                       <Grid container>
                                       {(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A') ?
                                          <Grid item xs={2}></Grid>:
                                           <Grid item xs={2}>
                                           <div>
                                                <Button
                                                    className={clsx(classes.button)}
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                    }}
                                                    to={`/apps/landing`}
                                                    component={Link}
                                                    type="button"
                                                >
                                                    <img className={clsx(classes.imgHeader)} src="assets/images/preescolar/artes-1.png" />
                                                </Button>
                                                
                                                    </div>
                                                    <div >
                                                    <Typography className={clsx(classes.TextTitle)}>	
                                                        Mis Clases 
                                                    </Typography>
                                                    </div>
                                           </Grid> 
                                         }
                                           <Grid item xs={9} className={classes.containerStyle, classes.videoScreen}>
                                {openGroups ? 
                                    <>
                                    <Typography fontFamily variant="h3" color="inherit" className={clsx(classes.groupTitle)}>
                                        {(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A') ?
                                            <div className={clsx(classes.fileNameStyle)}>
                                                    ¿A qué grupo impartirás clase?
                                            </div>
                                        :
                                            <div className={clsx(classes.fileNameStyle)}>
                                                 Selecciona un grupo para entrar a la clase
                                            </div>
                                        }
                                    </Typography>
                                    <div className={clsx(classes.groupDivButtons)}>
                                        {valueGroups.map(group => {
                                            return(
                                                    <Button onClick={()=>onClickGroup(group.id)} className={clsx(classes.groupButton,"normal-case")}>
                                                        <Typography>{group.name}</Typography>
                                                    </Button>
                                            );
                                        })}
                                    </div>
                                    
                                    </>
                                :

                                <>
                                    <div id="jitsi-container" className={classes.jitsiContainerOpen}>
                                                <img className={clsx(classes.img)} src="assets/images/logos/clublia.png" />
                                                </div>
                                                <div className={clsx('flex flex-col justify-center')}>    
                                {openMeeting !== false && aula.response &&
                                <>
                                <Carousel itemsToShow={1} className={classes.imgBackgroundStyle2}>
                                {aula.response?.map(file => {
                                    return(
                                        <>
                                        
                                            <p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, marginTop: 5, backgroundColor: '#c7c7c7', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold", textAlign:"center"}}>    
                                                <Button className='flex flex-col justify-center'
                                                    onClick={ev => {
                                                        ev.stopPropagation();
                                                        dispatch(downloadFile(file.replace('public','')));}}>
                                                    <Typography
                                                        className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4")}>
                                                        {file.slice(file.indexOf('_')+1)}
                                                    </Typography>

                                                    <Icon className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4 ml-4")}>save_alt</Icon>
                                                </Button>
                                            </p>
                                            
                                        </>
                                    )})
                                } 
                               </Carousel>
                                </>
                                } 
                                </div>
                                        {/* <Carousel itemsToShow={1} className={classes.imgBackgroundStyle2}> */}
                                        {/* <Item>1</Item>
                                        <Item>2</Item>
                                        <Item>3</Item>
                                        <Item>4</Item>
                                        <Item>5</Item>
                                        <Item>6</Item> */}
                                        {/* {items.map(item => <div key={item.id}>{item.title}</div>)} */}
                                        {/* <div className={classes.elementDown}>   
                                        <button className={classes.anotherelementDown}>Not file found</button>

                                        </div>
                                        <div className={classes.elementDown}>
                                            <p className={classes.anotherelementDown}>Not file found</p>
                                        </div> */}
                                    
                                        
                                        {/* <div>
                                            <p className="legend">Legend 3</p>
                                        </div> */}
                                        {/* </Carousel>                                     */}
              
                                </>
                         
                                    

                  
                                
                                
                                // <Droppable droppableId="vid">
                                //     {(droppableProvided) => (
                                //     <div className={classes.jitsiContainerOpen} {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                                //         <Draggable key={0} draggableId={0} index={1}>
                                //             {(draggableProvided) => (
                                //                 <div id="jitsi-container" {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                //                 <img className={clsx(classes.img)} src="assets/images/logos/clublia.png" />
                                //                 </div>
                                //             )}
                                //         </Draggable>
                                //         {droppableProvided.placeholder}
                                //     </div>    
                                //    )}
                                    
                                // </Droppable>
                                }
                            </Grid>
                            {/* <Grid className={classes.resourcesRight}>
                            {(gamesShow) && (
                                <div className={classes.imgBackgroundStyle3}>
                                <p className="legend"></p>
                                </div>)}
                            </Grid> */}
                            
                            {(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A') ?
                                <Grid item xs={4} className={classes.rightContainerStyle}>
                                <div className={clsx('flex flex-col justify-center')}>    
                                {openMeeting !== false && aula.response &&
                                <>
                                {aula.response?.map(file => {
                                    return(
                                        <>
                                            <p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, marginTop: 5, backgroundColor: '#c7c7c7', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold", textAlign:"center"}}>    
                                                <Button className='flex flex-col justify-center'
                                                    onClick={ev => {
                                                        ev.stopPropagation();
                                                        dispatch(downloadFile(file.replace('public','')));}}>
                                                    <Typography
                                                        className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4")}>
                                                        {file.slice(file.indexOf('_')+1)}
                                                    </Typography>

                                                    <Icon className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4 ml-4")}>save_alt</Icon>
                                                </Button>
                                            </p>
                                        </>
                                    )})
                                } 
                                {(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A') ?
                                    <input
                                        style={{alignSelf:"center",marginTop:"10%"}}
                                        className="mb-16"
                                        type="file"
                                        name="file"
                                        id="file"
                                        onChange={(e) => uploadFile(e.target.files[0])}
                                        variant="outlined"
                                    /> 
                                :
                                    <IconButton
                                        onClick={() => dispatch(getFileClassroom(meetingIdVal.response.meeting_id))}
                                        aria-label="open left sidebar"
                                        color="primary"
                                    >
                                        <Typography className={clsx(classes.fileNameStyle,"text-center text-16 font-600 m-4")}>Recursos para la clase </Typography>
                                        <Icon className={clsx(classes.fileNameStyle,"text-center text-16 font-600 mt-4")}>refresh</Icon>
                                    </IconButton>
                                }
                                </>
                                } 
                                </div>
                                </Grid> 
                            :
                                <Grid className={classes.resourcesRight}>
                                
                                <div className={classes.imgBackgroundStyle3}>
                                <p className="legend"></p>
                                </div>
                                </Grid> 
                            }
                            </Grid>
                                       
                                

                            {/* ------------------------- Avatar and User Info --------------------- */}
                            {/* <div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">
                                <UserInfoHeader/>
                            </div> */}
                        {/* </div> */}


                        {/* <div className="float flex w-full flex-wrap ">

                        </div> */}

                        

                       
                        
                        {/* <Grid container direction="row" className={classes.containerStyle}> */}
                            {/* <Grid item xs={9} className={classes.containerStyle}>
                                {openGroups ? 
                                    <>
                                    <Typography fontFamily variant="h3" color="inherit" className={clsx(classes.groupTitle)}>
                                        {(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A') ?
                                            <div className={clsx(classes.fileNameStyle)}>
                                                    ¿A qué grupo impartirás clase?
                                            </div>
                                        :
                                            <div className={clsx(classes.fileNameStyle)}>
                                                 Selecciona un grupo para entrar a la clase
                                            </div>
                                        }
                                    </Typography>
                                    <div className={clsx(classes.groupDivButtons)}>
                                        {valueGroups.map(group => {
                                            return(
                                                    <Button onClick={()=>onClickGroup(group.id)} className={clsx(classes.groupButton,"normal-case")}>
                                                        <Typography>{group.name}</Typography>
                                                    </Button>
                                            );
                                        })}
                                    </div>
                                    </>
                                :
                                <div id="jitsi-container" className={classes.jitsiContainerOpen}>
                                    <img className={clsx(classes.img)} src="assets/images/logos/clublia.png" />
                                </div>
                                }
                            </Grid> */}
                            {/* <Grid item xs={3} className={classes.rightContainerStyle}>
                                <div className={clsx('flex flex-col justify-center')}>    
                                {openMeeting !== false && aula.response &&
                                <>
                                {aula.response?.map(file => {
                                    return(
                                        <>
                                            <p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, marginTop: 5, backgroundColor: '#c7c7c7', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold", textAlign:"center"}}>    
                                                <Button className='flex flex-col justify-center'
                                                    onClick={ev => {
                                                        ev.stopPropagation();
                                                        dispatch(downloadFile(file.replace('public','')));}}>
                                                    <Typography
                                                        className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4")}>
                                                        {file.slice(file.indexOf('_')+1)}
                                                    </Typography>

                                                    <Icon className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4 ml-4")}>save_alt</Icon>
                                                </Button>
                                            </p>
                                        </>
                                    )})
                                } 
                                {(role === 'maestro_preescolar' || role === 'maestro_secundaria' || role === 'profesor_summit_2021' || role === 'maestro' || role ==='maestroe1' || role === 'maestroe2' || role === 'maestroe3' || role === 'Maestro-I' || role === 'Maestro-M' || role === 'Maestro-A') ?
                                    <input
                                        style={{alignSelf:"center",marginTop:"10%"}}
                                        className="mb-16"
                                        type="file"
                                        name="file"
                                        id="file"
                                        onChange={(e) => uploadFile(e.target.files[0])}
                                        variant="outlined"
                                    /> 
                                :
                                    <IconButton
                                        onClick={() => dispatch(getFileClassroom(meetingIdVal.response.meeting_id))}
                                        aria-label="open left sidebar"
                                        color="primary"
                                    >
                                        <Typography className={clsx(classes.fileNameStyle,"text-center text-16 font-600 m-4")}>Recursos para la clase </Typography>
                                        <Icon className={clsx(classes.fileNameStyle,"text-center text-16 font-600 mt-4")}>refresh</Icon>
                                    </IconButton>
                                }
                                </>
                                } 
                                </div>
                            </Grid> */}
                        {/* </Grid> */}
                         
                        
                    </div>
                }
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}
export default withReducer('AulaVirtualApp', reducer)(AulaVirtualApp);
