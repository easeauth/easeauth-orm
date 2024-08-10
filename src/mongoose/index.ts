import { Model, Document, UpdateQuery, isValidObjectId } from "mongoose";
import { BaseModel, Query } from "../types";


export class MongoModel<T> implements BaseModel<T> {
    private model: Model<T>;


    constructor(model: Model<T>) {
        this.model = model;
    };


    async create(payload: T) {
        const doc = await this.model.create(payload);
        return this.transformDocument(doc) as T;
    };


    async exists(query: Query<T>) {
        const doc = await this.model.exists(this.transformQuery(query));

        if (doc) {
            return { id: (doc as any)._id.toString() };
        };
        
        return null;
    };


    async find(query: Query<T>) {
        const docs = await this.model.find(this.transformQuery(query));
        return docs.map(doc => this.transformDocument(doc) as T);
    };


    async findById(id: string) {
        const doc = await this.model.findById(id);
        return this.transformDocument(doc);
    };


    async findByIdAndUpdate(id: string, payload: T) {
        const doc = await this.model.findByIdAndUpdate(
            id, 
            payload as UpdateQuery<T>, 
            { new: true }
        );
        return this.transformDocument(doc);
    };


    async findByIdAndDelete(id: string) {
        const doc = await this.model.findByIdAndDelete(id);
        return this.transformDocument(doc);
    };


    isValidDocumentId(id: string) {
        return isValidObjectId(id);
    };


    private transformDocument(
        doc: Document | { _id: any } | null
    ) {
        if (doc === null) return null;

        // Handle document transformation
        if (doc._id) {
            // Replace `_id` with `id`
            (doc as any).id = doc._id.toString();
            delete (doc as any)._id;
        };

        return doc as T;
    };


    private transformQuery(query: Query<T>) {
        // Handle query transformation
        if (query.id) {
            // Replace `id` with `_id`
            (query as any)._id = query.id;
            delete (query as any).id;
        };

        return query as Query<T>;
    };
};
