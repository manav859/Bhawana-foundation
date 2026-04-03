import mongoose from 'mongoose';
import Project from './src/models/Project.js';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const testData = {
            title: 'Test Validation ' + Date.now(),
            shortDescription: 'test',
            fullDescription: 'test content',
            category: 'Education',
            location: 'India',
            beneficiaries: 0,
            status: 'draft',
            isFeatured: false,
            images: [],
            impactStats: {}
        };

        console.log('Attempting to create project with:', testData);
        const p = await Project.create(testData);
        console.log('Project created successfully:', p._id);
        
        // Clean up
        await Project.findByIdAndDelete(p._id);
        
        process.exit(0);
    } catch (err) {
        console.error('Mongoose Error Name:', err.name);
        if (err.errors) {
            Object.keys(err.errors).forEach(key => {
                console.error(`Field '${key}':`, err.errors[key].message);
            });
        } else {
            console.error('Error Message:', err.message);
        }
        process.exit(1);
    }
}

test();
