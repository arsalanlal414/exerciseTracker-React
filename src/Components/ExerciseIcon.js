import React from 'react'
import { FaWalking, FaHiking, FaRunning } from 'react-icons/fa'
import { IoMdBicycle } from 'react-icons/io'
import { TbSwimming } from 'react-icons/tb'
import { GiHiking } from 'react-icons/gi'


function ExerciseIcon({type}) {

    console.log("exercise type is",type)
    if(type === "walking"){
        return <FaWalking className='activity-icons'/>
    }
    else if(type === 'cycling'){
        return <IoMdBicycle className='activity-icons'/>
    }
    else if(type === 'hiking'){
        return <GiHiking className='activity-icons'/>
    }
    else if(type ==='running'){
        return <FaRunning className='activity-icons'/>
    }
    else if(type === 'swimming'){
        return <TbSwimming className='activity-icons'/>
    }
}

export default ExerciseIcon