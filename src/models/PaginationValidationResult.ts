
export interface PaginationValidationResult {

    detected: boolean;

    executed: boolean;

    passed: boolean;

    currentPage: number;

    totalPages: number;

    nextWorked: boolean;

    previousWorked: boolean;

    pageSizeChanged: boolean;

    beforeRowCount: number;

    afterRowCount: number;

    duration: number;

    message: string;

}