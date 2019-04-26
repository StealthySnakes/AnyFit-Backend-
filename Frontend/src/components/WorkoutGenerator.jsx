import React, {Component} from 'react';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Bootstrap from "react-bootstrap";
import './WorkoutGenerator.css';
import {Card, Form, Modal} from 'react-bootstrap';
import Navigation from './Navigation';
import axios from 'axios';

import {Exercise} from '../models/Exercise';
import {Workout} from '../models/Workout';

import { ExerciseCard, ExerciseList } from './ExerciseList';
import { WorkoutGeneratorRepository } from '../api/workoutGenRepo';

function FormOptions(props){
  return <>
  {props.opts.map((opt) => <option value={opt}>{opt}</option>)  }
    </>
}

class WorkoutGenerator extends Component {

  workoutGeneratorRepo = new WorkoutGeneratorRepository;

  constructor(props, context) {
    super(props, context);

    this.state = {
      category: [],
      expertise: [],
      length: [],
      intensity: [],
      exercisesGenerated: [
        new Exercise("Planks", "lie there on the floor", "https://static-s.aa-cdn.net/img/ios/1132834831/eb7c52c5f7fd82798ff99ad6264c8727?v=1", 4,3,3),
        new Exercise("Jumping Jacks", "up and down boysssszzz", "https://data.whicdn.com/images/132534183/large.png", 4,4,8),
        new Exercise("Planks", "lie there on the floor", "https://static-s.aa-cdn.net/img/ios/1132834831/eb7c52c5f7fd82798ff99ad6264c8727?v=1", 4,3,10),
        new Exercise("Planks", "lie there on the floor", "https://static-s.aa-cdn.net/img/ios/1132834831/eb7c52c5f7fd82798ff99ad6264c8727?v=1", 4,10,10),
      ],
      //these are the exercise that have been kept
      chosenExercises:[],
      showAddExercise:false,
      showAddWorkout:false,
      customExerciseName:"",
      customExerciseSets:0,
      customExerciseReps:0,
      customExerciseDuration:0,
      customExerciseDescription:0,
      workoutName:0,
      workoutIntensity:0,
      workoutExperience:0,
      workoutDuration:0,
      workoutDescription:0,

      exerciseOptions:[],
      custom_image_url:"https://via.placeholder.com/150"
    };
    this.handleWorkoutGenerate = this.handleWorkoutGenerate.bind(this);
    this.handleCustomAdditionSubmit = this.handleCustomAdditionSubmit.bind(this);
    this.handleWorkoutSubmit = this.handleWorkoutSubmit.bind(this);
  }
  componentDidMount() {

    //set up exercise for drop down

    this.workoutGeneratorRepo.getExercises().then(
      exercises =>
      {
        var temp=[]
        for(let i=0;i<exercises.length;i++){
          temp.push(exercises[i].exercise_name)
        }
        this.setState({ exerciseOptions: temp })
      }


    );

    // this.workoutGeneratorRepo.addWorkout(wrkt);
    // this.workoutGeneratorRepo.addExerciseToWorkout(wrkt.name,ex);

  }


  handleWorkoutGenerate(event) {
    this.workoutGeneratorRepo.getGeneratedWorkout(1, 2, 3, 4).then(
      workout => {
        var temp=[]
        // exercise_id

        for(let exercise of workout){
          temp.push(new Exercise(exercise.exercise_name, exercise.exercise_desc, exercise.exercise_image,exercise.default_length, 2,2))
        }
        this.setState({ exercisesGenerated: temp })
      }
    )


    //generate the the workout using the button chosen parameters

  }
  handleCustomAdditionSubmit(event) {
    //add to generated workouts
    // var loc_image=this.state.exerciseOptions.indexOf(this.state.customExerciseName)

    // this.setState({custom_image_url:""});
    // alert(this.state.custom_image_urls)



    this.workoutGeneratorRepo.getExercisePic(this.state.customExerciseName).then(image =>



        {
             this.setState(
               state => {state.exercisesGenerated.push(new Exercise(this.state.customExerciseName,
                 this.state.customExerciseDescription,
                image[0].exercise_image,
                 this.state.customExerciseDuration,
                 this.state.customExerciseSets,
                 this.state.customExerciseReps))
                 return state;
               })
        }
             );
               this.setState({ showAddExercise: false })

  }

  handleWorkoutSubmit(event){

    event.preventDefault();

    const workout = {
      chosenExercises:    this.state.chosenExercises,
      workoutName:    this.state.workoutName,
      workoutIntensity:   this.state.workoutIntensity,
      workoutExperience:    this.state.workoutExperience,
      workoutDuration:    this.state.workoutDuration,
      workoutDescription:   this.state.workoutDescription
    };

    console.log(workout)
    // axios.post(`https://jsonplaceholder.typicode.com/users`, { workout })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   })

  //add workout array to backend ----exercisesGenerated and all workout meta data
    this.setState({category: [], expertise: [], length: [], intensity: [], showAddWorkout:false});
  }

  render() {
    return (<> < Navigation />
    <h1>Generate Workout</h1>
   <h2>  Focus</h2>
   <div >
    <ToggleButtonGroup className="w-100" name="Focus" id="category" type="radio" value={this.state.category} onChange={event => this.setState({category: [event]})}>
      <ToggleButton value={"Strength"}>Strength</ToggleButton>
      <ToggleButton value={"Muscle"}>Muscle</ToggleButton>
      <ToggleButton value={"Mobility"}>Mobility</ToggleButton>
      <ToggleButton value={"Speed"}>Speed</ToggleButton>
      <ToggleButton value={"Flexibility"}>Flexibility</ToggleButton>
      <ToggleButton value={"Cardio"}>Cardio</ToggleButton>
    </ToggleButtonGroup>

    <h2>
      Expertise
    </h2>
    <ToggleButtonGroup className="w-75" name="Expertise" type="radio" value={this.state.expertise} onChange={event => this.setState({expertise: [event]})}>
      <ToggleButton value={1}>Beginner</ToggleButton>
      <ToggleButton value={2}>Novice</ToggleButton>
      <ToggleButton value={3}>Intermediate</ToggleButton>
      <ToggleButton value={4}>Advanced</ToggleButton>
    </ToggleButtonGroup>

    <h2>
      Length
    </h2>
    <ToggleButtonGroup className="w-50" name="Length" type="radio" value={this.state.length} onChange={event => this.setState({length: [event]})}>
      <ToggleButton value={1}>30 min</ToggleButton>
      <ToggleButton value={2}>60 min</ToggleButton>
      <ToggleButton value={3}>90 min</ToggleButton>
      <ToggleButton value={4}>120 min</ToggleButton>
    </ToggleButtonGroup>

    <h2>
      Intensity
    </h2>
    <ToggleButtonGroup className="w-25"  name="Intensity" type="radio" value={this.state.intensity} onChange={event => this.setState({intensity: [event]})}>
      <ToggleButton value={1}>Easy</ToggleButton>
      <ToggleButton value={2}>Medium</ToggleButton>
      <ToggleButton value={3}>Hard</ToggleButton>
    </ToggleButtonGroup>
    </div>
    <ButtonToolbar bsPrefix="inline-flex">
      <Button onClick={this.handleWorkoutGenerate} className="m-4" size="lg" variant="outline-primary">Generate Workout</Button>
      <Button onClick={event => this.setState({ showAddExercise: true })} className="m-4" size="lg"  variant="outline-secondary">Add custom exercise</Button>
    </ButtonToolbar>

    <hr></hr>
    <Modal show={this.state.showAddExercise} onHide={event => this.setState({ showAddExercise: false })}>
            <Modal.Header closeButton>
              <Modal.Title>Add Custom Exercise</Modal.Title>
            </Modal.Header>
            <Modal.Body>


              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Exercises</Form.Label>
                  <Form.Control as="select"
                    onChange={event =>  {this.setState({customExerciseName: event.currentTarget.value})}}>
                    <FormOptions opts={this.state.exerciseOptions}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Sets</Form.Label>
                  <Form.Control as="select"
                    onChange={event =>  {this.setState({customExerciseSets: event.currentTarget.value})}}>
                    <FormOptions opts={[1,2,3,4,5]}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Reps</Form.Label>
                  <Form.Control as="select" onChange={event =>  {this.setState({customExerciseReps: event.currentTarget.value})}}>
                    <FormOptions opts={[1,2,3,4,5]}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control as="select" onChange={event =>  {this.setState({customExerciseDuration: event.currentTarget.value})}}>
                    <FormOptions opts={[1,2,3,4,5]}/>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows="3" onChange={event =>  {this.setState({customExerciseDescription: event.currentTarget.value})}} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={event => this.setState({ showAddExercise: false })}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.handleCustomAdditionSubmit}>
                Add Exercise
              </Button>
            </Modal.Footer>
          </Modal>

    <h2>
      Choose exercises to keep in Generated Workout
      <br></br>
    </h2>
    <ExerciseList exercises={this.state.exercisesGenerated} onExerciseSelected=
       {(exerciseName) =>
         {

         this.setState(
           state => {state.chosenExercises.push(exerciseName)
             return state;
           })

           // alert(this.state.chosenExercises)

         }
       }

           />
         <Button onClick={event => this.setState({ showAddWorkout: true })} className="mt-4" size="lg" variant="outline-success" block="block">Add to Workouts</Button>


           <Modal show={this.state.showAddWorkout} onHide={event => this.setState({ showAddWorkout: false })}>
                   <Modal.Header closeButton>
                     <Modal.Title>Add Workout</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>



                     <Form>
                       <Form.Group controlId="exampleForm.ControlInput1">
                         <Form.Label>Workout Name</Form.Label>
                         <Form.Control type="text" placeholder="2n semester workout" onChange={event =>  {this.setState({workoutName: event.currentTarget.value})}}/>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlSelect1">
                         <Form.Label>Intensity</Form.Label>
                         <Form.Control as="select" onChange={event =>  {this.setState({workoutIntensity: event.currentTarget.value})}}>
                           <FormOptions opts={[1,2,3,4,5]}/>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlSelect1">
                         <Form.Label>Experience Level</Form.Label>
                         <Form.Control as="select" onChange={event =>  {this.setState({workoutExperience: event.currentTarget.value})}}>
                           <FormOptions opts={[1,2,3,4,5]}/>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlSelect1">
                         <Form.Label>Duration</Form.Label>
                         <Form.Control as="select" onChange={event =>  {this.setState({workoutDuration: event.currentTarget.value})}}>
                           <FormOptions opts={[1,2,3,4,5]}/>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group controlId="exampleForm.ControlTextarea1">
                         <Form.Label>Workout Description</Form.Label>
                         <Form.Control as="textarea" rows="3" onChange={event =>  {this.setState({workoutDescription: event.currentTarget.value})}}/>
                       </Form.Group>
                     </Form>
                   </Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={event => this.setState({ showAddWorkout: false })}>
                       Cancel
                     </Button>
                     <Button variant="primary" onClick={this.handleWorkoutSubmit}>
                       Add Workout
                     </Button>
                   </Modal.Footer>
                 </Modal>
  </>);
  }
}

export default WorkoutGenerator;
